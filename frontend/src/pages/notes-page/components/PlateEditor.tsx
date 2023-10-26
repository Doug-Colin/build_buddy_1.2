import {
  Plate,
} from '@udecode/plate-common'
// Plate components.
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
// Plate plugins.
import plugins from '../plugins/plugins'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
//import { useState } from 'react'
//import { MyValue } from '@/types/plate-types'

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
  //const initialContent = currentNote && currentNote.noteContent ? JSON.parse(currentNote.noteContent) : initialValue
  // Attempting localStorage to persist editorContent; refactor code to send to backend afterwards
  const mockDbNoteContent = localStorage.getItem('mockCurrentNoteContent')
  const initialContent = mockDbNoteContent ? JSON.parse(mockDbNoteContent) : initialValue
  //const [editorContent, setEditorContent] = useState<MyValue>(initialContent)

  
  /* Pseudocode 
  1. Sending editorContent to backend
    - create local state to hold editorContent
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
      initialValue={initialContent}
      onChange={(editorContent) => {
        console.log(`Value of current editorContent is now is now ${JSON.stringify(
              editorContent,
            )}`)

            localStorage.setItem('mockCurrentNoteContent', JSON.stringify(editorContent))
      }}
    >
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <Editor/>

      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  )
}
