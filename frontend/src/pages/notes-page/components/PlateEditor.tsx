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
import { set } from 'date-fns'

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

  // If user has setCurrentNote by clicking in table, load currentNote's content into editor. Otherwise display placeolder text (may want to refactor this to be a useEffect hook, and to use less confusing variable names).
  // const initialContent =
  //   currentNote && currentNote.noteContent
  //     ? JSON.parse(currentNote.noteContent)
  //     : initialValue

  // Local storage mockup of noteContent persistence.
  // const mockDbNoteContent = localStorage.getItem('mockCurrentNoteContent')
  // const initialContent = mockDbNoteContent ? JSON.parse(mockDbNoteContent) : initialValue

  // State for content of currentNote.
  const [currentEditorContent, setCurrentEditorContent] = useState<MyValue>(initialValue)

  /* Pseudocode 
  1. Sending editorContent to backend
   X - create local state to hold editorContent
    - Plate already has onChange prop watching for content changes
    - update onChange to setEditorContent
    - confirm that editorContent is being updated in state
    - in onChange, add dispatch to send editorContent to backend
    - confirm content is being sent to backend
    - revisit how to write a debouncing function to prevent too many calls to backend
    - implement debouncing function

  2. Retrieving editorContent from backend
    - when note is selected, dispatch to get note content from backend via redux action setCurrentNote
    - confirm that note content is being retrieved from backend
    - confirm that note content is being set in editorContent state
    - load editorContent state into editor
    - confirm that editorContent is being loaded into editor
    - confirm that editorContent will load upon clicking of any notes in NotesDataTable.

  */

  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(editorContent) => {
        setCurrentEditorContent(editorContent)
        JSON.stringify(editorContent)
        console.log(
          `Value of current editorContent is now ${JSON.stringify(editorContent)}`,
          `Value of currentEditorContent is now ${currentEditorContent}`
        )
        //setCurrentEditorContent(editorContent)
        if (currentNote && currentEditorContent) {
          dispatch(
            updateNote({
              noteId: currentNote._id,
              newNoteContent: {noteContent: editorContent}
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
