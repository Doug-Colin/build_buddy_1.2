import { Plate } from '@udecode/plate-common'
// Plate components.
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
// Plate plugins.
import plugins from '../plugins/plugins'
// Redux.
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { updateNote } from '@/features/notes/noteSlice'
// React.
import { useState } from 'react'
// Types.
import { MyValue } from '@/types/plate-types'
// import { set } from 'date-fns'

const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: 'Type here to start your note here' }],
  },
]

export function PlateEditor() {
  const dispatch = useAppDispatch()
  const currentNote = useAppSelector((state) => state.notes.currentNote)
  const currentNoteId = currentNote?._id
  console.log(currentNote?._id)
  // If user has setCurrentNote by clicking in table, load currentNote's content into editor. Otherwise display placeolder text (may want to refactor this to be a useEffect hook, and to use less confusing variable names).
  // const initialContent =
  //   currentNote && currentNote.noteContent
  //     ? JSON.parse(currentNote.noteContent)
  //     : initialValue

  // Local storage mockup of noteContent persistence.
  // const mockDbNoteContent = localStorage.getItem('mockCurrentNoteContent')
  // const initialContent = mockDbNoteContent ? JSON.parse(mockDbNoteContent) : initialValue

  // State for content of currentNote.
  const [currentEditorContent, setCurrentEditorContent] =
    useState<MyValue>(initialValue)

  /* Pseudocode 
  1. Sending editorContent to backend
   X - create local state to hold editorContent
   X - Plate already has onChange prop watching for content changes
   X - update onChange to setEditorContent
   X - confirm that editorContent is being updated in state
   X - in onChange, add dispatch to send editorContent to backend
   X - confirm content is being sent to backend
    - revisit how to write a debouncing function to prevent too many calls to backend
    - implement debouncing function

  2. Retrieving editorContent from backend
    - when note is selected, dispatch to get note content from backend via redux action setCurrentNote
    - confirm that note content is being retrieved from backend
    - confirm that note content is being set in editorContent state
    - load editorContent state into editor
    - confirm that editorContent is being loaded into editor
    - confirm that editorContent will load upon clicking of any notes in NotesDataTable.


     - currentNote.noteContent will be loaded into the editor upon selecting a note. Otherwise the editor should have a 'type here to start your note' that dissapears upon entering text. 
  */

  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(editorContent) => {
        console.log(
          `Value of current editorContent, stringified is now ${JSON.stringify(
            editorContent,
          )}`,
        )
        setCurrentEditorContent(editorContent)
        JSON.stringify(currentEditorContent)
        // dispatch(
        //   updateNote({
        //     noteId: currentNoteId,
        //     newNoteContent: JSON.stringify(editorContent),
        //   }),
        // )
        // console.log(
        //   `Value of local state currentEditorContent is  ${currentEditorContent}, and when stringified, it is ${JSON.stringify(
        //     currentEditorContent,
        //   )}`,
        // )
        // console.log(
        //   `The type of state currentEditorContent stringified is ${typeof JSON.stringify(
        //     currentEditorContent,
        //   )}`,
        // )

        if (currentNote && currentEditorContent) {
          console.log(`dispatching updateNote action with args (noteId, newNoteContent).
          Value of arg noteId: currentNote._id is ${currentNote._id}.
          Value of arg newNoteContent: editorContent is ${JSON.stringify(editorContent)}.`)
          dispatch(
            updateNote({
              noteId: currentNote._id,
            newNoteContent: JSON.stringify(editorContent)
            //Works. consider adjusting updateNOte async thunk in noteSlice to expect an Object instead of a string, may alos make sense to use Partial<Note> type in case you want to later allow users to change other things when duplicating (name, etc), esp. if you create a UI that has more info about each note in eleljments above the note. )
            //newNoteContent: {noteContent: (JSON.stringify(editorContent))}
            }),
          )
        }

        //const noteContent = JSON.parse(response.data);

        //localStorage.setItem('mockCurrentNoteContent', JSON.stringify(editorContent))
      }}
      // onChange={(editorContent) => {
      //   console.log(`Value of current editorContent is now is now ${JSON.stringify(
      //         editorContent,
      //       )}`)

      //       localStorage.setItem('mockCurrentNoteContent', JSON.stringify(editorContent))
      // }}
    >
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <Editor />

      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  )
}
