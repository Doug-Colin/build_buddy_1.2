import axios from 'axios'
import { Note, NoteDTO } from '@/types/types'
import { getConfig } from '@/lib/axiosUtils'

const API_URL = '/api/notes/'

// HTTP requests to the backend made via appropriate Axios methods
// Auth token is sent as a Bearer token in the config arg of the Axios req. method via getConfig()

//Create note
const createNote = async (note: NoteDTO, token: string) => {
  const response = await axios.post(API_URL, note, getConfig(token))
  return response.data
}

//Get user's notes
const getNotes = async (token: string) => {
  const response = await axios.get(API_URL, getConfig(token))
  return response.data
}

// Update Note
const updateNote = async (
  noteId: string,
  updatedNote: Partial<Note>,
  token: string,
) => {
  const response = await axios.put(
    API_URL + noteId,
    updatedNote,
    getConfig(token),
  )
  return response.data
}


//Delete note
const deleteNote = async (noteId: string, token: string) => {
  const response = await axios.delete(API_URL + noteId, getConfig(token))
  return response.data
}

const noteService = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
}

export default noteService
