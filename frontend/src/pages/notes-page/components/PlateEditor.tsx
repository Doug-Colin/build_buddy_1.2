//import { useAppDispatch, useAppSelector } from '@/app/hooks'

import {
  Plate,
} from '@udecode/plate-common'

import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'

//import { useState } from 'react'
//import { MyValue } from '@/types/plate-types'




//-------------------------------------------
import plugins from '../plugins/plugins'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
// import { Editor } from '@/components/plate-ui/editor'
// import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
// import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
// import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
// import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'

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

      <Editor />

      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  )
}
