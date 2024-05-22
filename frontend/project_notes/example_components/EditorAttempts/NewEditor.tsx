// React.
import { useState, useEffect } from 'react'
// Plate dependencies, components, plugins, and types.
import { Plate, PlateContent, useEditorRef } from '@udecode/plate-common'
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import plugins from '../../../src/pages/notes-page/plugins/plugins'
import { MyValue } from '@/types/plate-types'
// Redux.
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { updateNote } from '@/features/notes/noteSlice'
// Hooks.

export function NewEditor() {
  const dispatch = useAppDispatch()
  const currentNote = useAppSelector((state) => state.notes.currentNote)
  // const currentNoteId = currentNote?._id

  //// State and variable for placeholder text.
  //   const [placeHolderVisible, setPlaceHolderVisible] = useState(true)
  const placeholderText = [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'Type here to start your note.' }],
    },
  ]

  // State for content of currentNote.
  const [currentEditorContent, setCurrentEditorContent] =
    useState<MyValue>(placeholderText)

  // useEffect(() => {
  //   const content = currentNote?.noteContent
  //     ? JSON.parse(currentNote.noteContent)
  //     : placeholderText
  //   setCurrentEditorContent(content)
  // }, [currentNote])

  /*

-clickin in table correctly sets currentNote in global state; Table seems good. 

-Typing in editor is not currently changing the currentNote.noteContent in the backend.
-editor is keekping track of itselfvis onChange, but not properly updating currentNote/sending to backend.
-Why would this be? Well it seems that updateNote is being dispatched, but that the currentNote content is not being loaded into the editor. 
-On creation of a new note, the same thing happens. 
-Already tested reqs to backen via Postman and they work, so it's not the backend.
-obviously the currentNote is not being loaded into the editor. Figure that out and then figure out if the editor is updating/sending the right data to the backend.
*/
  return (
    <Plate
      plugins={plugins}
      initialValue={placeholderText}
      onChange={(editorContent) => {
        setCurrentEditorContent(editorContent)
        JSON.stringify(currentEditorContent)

        // if (currentNote && currentEditorContent) {
        //   useEffect(() => {
        //     // API call or action with the debounced valu
        //     dispatch(
        //       updateNote({
        //         noteId: currentNote?._id,
        //         updatedNoteContent: JSON.stringify(debouncedValue),
        //       }),
        //     )
        //   }, [debouncedValue])
        // }
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
