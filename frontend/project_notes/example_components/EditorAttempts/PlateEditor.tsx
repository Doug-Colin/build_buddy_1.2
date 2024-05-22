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
import { Note } from '@/types/types'
import { updateNote } from '@/features/notes/noteSlice'
import { set } from 'date-fns'

interface PlateEditorProps {
  editorRef: any
  initialContent: MyValue
}

export function PlateEditor({ editorRef, initialContent }: PlateEditorProps) {
  const dispatch = useAppDispatch()
  //const currentNote = useAppSelector((state) => state.notes.currentNote)
  // const currentNoteId = currentNote?._id

  // // State for content of currentNote.
  // const [currentEditorContent, setCurrentEditorContent] =useState<MyValue>()

  ////Handler for content change (when user types in editor)
  // const onContentChange = (editorContent: MyValue) => {
  //   setCurrentEditorContent(editorContent)

  //   }

  //  const placeholder = [
  //   {
  //     id: '1',
  //     type: 'p',
  //     children: [{ text: '(Click and) Type here to start your note.' }],
  //   },
  // ]

  // Initialize editor's content.
  // const initialContent = currentNote?.noteContent ? setCurrentEditorContent(JSON.parse(currentNote.noteContent))
  // : placeholder
  // useEffect(() => {
  //   setCurrentEditorContent(initialContent)
  // }, [currentNote])

  //

  return (
    <Plate
      plugins={plugins}
      editorRef={editorRef}
      initialValue={initialContent}
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

      <Editor placeholder="Type here to start your note" />

      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  )
}

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
    X - when note is selected, dispatch to get note content from backend via redux action setCurrentNote
    X - confirm that note content is being retrieved from backend
    X - confirm that note content is being set in editorContent state
    - load editorContent state into editor

      Pseudo code: Loading currentNote content into editor.
          -you have the current note, set in columns.tsx when notetitle is clicked, via setCurrentNote, which sets it to global state. 

          -since it's in global state, all you should need to do is access that via useAppSelector. It could make sense to lift some of this stuff up, or note. I'm not sure if control matters as much when using Redux global state.... but it could make sense to pass the currentNote.content from NotesPage.tsx, as a prop to the editor.


    - confirm that editorContent is being loaded into editor
    - confirm that editorContent will load upon clicking of any notes in NotesDataTable.


     - currentNote.noteContent will be loaded into the editor upon selecting a note. Otherwise the editor should have a 'type here to start your note' that dissapears upon entering text. 
  */
