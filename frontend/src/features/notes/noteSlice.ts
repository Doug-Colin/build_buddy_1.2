import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createTypedAsyncThunk } from '@/app/hooks'
import noteService from '@/features/notes/noteService'
import type { RootState } from '../../app/store'
import { Note, NoteDTO } from '@/types/types'
import { getErrorMessage } from '@/lib/axiosUtils'

//Type for the initialState.
interface NoteState {
  notes: Note[]
  currentNote: null | Note
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  message: string | null
}

// The initialState.
const initialState: NoteState = {
  notes: [],
  currentNote: null,
  status: 'idle',
  error: null,
  message: null,
}

// Async Thunk function to create a note.
export const createNote = createTypedAsyncThunk(
  'notes/createNote',
  async (note: NoteDTO, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await noteService.createNote(note, token)
      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Async Thunk function to get user' s note's.
export const getNotes = createTypedAsyncThunk(
  'notes/getUserNotes',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      return await noteService.getNotes(token)
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Update note
export const updateNote = createTypedAsyncThunk(
  'notes/updateNote',
  async (
    // Had first arg type as 'editorState: EditorState', check if required when adhering to data model.
    args: { noteId: string; updatedNoteContent: string },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await noteService.updateNote(
        args.noteId,
        args.updatedNoteContent,
        token,
      )
      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Delete user note
export const deleteNote = createTypedAsyncThunk(
  'notes/deleteNote',
  async (noteId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await noteService.deleteNote(noteId, token)
      return { noteId, response }
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,

  reducers: {
    setCurrentNote: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
      console.log(state.currentNote)
    },
    clearCurrentNote: (state) => {
      state.currentNote = null
    },
  },

  extraReducers: (builder) => {
    builder
      //Create Note
      .addCase(createNote.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Use the error message from the rejected value
        state.message = 'Failed to create note.' // Set an error message
      })

      // Get Notes
      .addCase(getNotes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to fetch notes.'
      })

      //Update Notes
      .addCase(updateNote.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id,
        )
        //if findIndex() finds the note._id that is the update target, send that as the payload
        if (index !== -1) {
          state.notes[index] = action.payload
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Use the error message from the rejected value
        state.message = 'Failed to update note.' // Set an error message
      })

      //Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.noteId,
        )
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to delete note'
      })
  },
})

export const { setCurrentNote, clearCurrentNote } = noteSlice.actions;

export default noteSlice.reducer
