// React.
import { useState, useEffect, useMemo } from 'react'
// Plate dependencies, components, plugins, and types.
import { Plate } from '@udecode/plate-common'
import { useEditorRef } from '@udecode/plate-common'
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
// Types
import { Note } from '@/types/types'

// Youve got two separate issues:
//         -1, the editor is not loading the currentNote.noteContent into the editor when a note is selected.

interface localStorageEditorProps {
  editorRef: any
  initialContent: MyValue
  currentNote: Note
}

export function NewPlateEditor({
  editorRef,
  initialContent,
  currentNote,
  currentNoteContent,
}: localStorageEditorProps) {
  const dispatch = useAppDispatch()
  // const currentNote = useAppSelector((state) => state.notes.currentNote)
  // const currentNoteId =({ if (currentNote) {currentNote._id}})
  //   const currentNoteId =
  //     currentNote._id || 'There is no currentNote and thus no currentNote._id.'

  // const placeholder = [
  //   {
  //     id: '1',
  //     type: 'p',
  //     children: [
  //       {
  //         text: 'Type here to start your note.',
  //       },
  //     ],
  //   },
  // ]

  // const initialValue =
  //   currentNote && currentNote.noteContent
  //     ? JSON.parse(currentNote.noteContent)
  //     : placeholder

  // -------------------------------- State to store the editor's content  ---------------------------------- //
  // const [editorContent, setEditorContent] = useState((initialValue) => {
  //   // Initialize state based on currentNote or use placeholder
  //   return currentNote && currentNote.noteContent
  //     ? JSON.parse(currentNote.noteContent)
  //     : placeholder
  // })

  // useEffect(() => {
  //     if (currentNote) {
  //       const content = JSON.parse(currentNote.noteContent || '[]');
  //       setEditorContent(content);
  //     }
  //   }, [currentNote]);
  console.log(`The value of currentNote._id is now ${currentNote?._id}`)

  // const initalValue = currentNote  && currentNote.noteContent ? JSON.parse(currentNote.noteContent) : placeholder
  // const initalValue= useEffect( currentNote  && currentNote.noteContent ? JSON.parse(currentNote.noteContent) : placeholder ), [currentNote]

  //   const initialContent = currentNote?.noteContent
  //     ? JSON.parse(currentNote.noteContent)
  //     : placeholder

  // State for editor's content MAY NOT BE NECESSARY AS PLATE TAKES CARE OF THAT
  // const [editorContent, setEditorContent] = useState<MyValue>(placeholder)

  // If user has setCurrentNote by clicking in table, load currentNote's content into editor. Otherwise display placeolder text (may want to refactor this to be a useEffect hook, and to use less confusing variable names).
  //   const initialContent =!currentNote?.noteContent && placeHolderVisible ? placeholderText : testJsonParse(currentNote?.noteContent)

  // Local storage mockup of noteContent persistence.
  //const mockDbNoteContent = localStorage.getItem('mockCurrentNoteContent')

  /* Pseudocode 
  1. Sending editorContent to backend
   X - create local state to hold editorContent
   X - Plate already has onChange prop watching for content changes
   X - update onChange to setEditorContent
   X - confirm that editorContent is being updated in state
   X - in onChange, add dispatch to send editorContent to backend
   X - confirm content is being sent to backend
    (later)- revisit how to write a debouncing function to prevent too many calls to backend
    (later)- implement debouncing function

  2. Retrieving editorContent from backend
    X - when note is selected, dispatch to get note content from backend via redux action setCurrentNote
    X - confirm that note content is being retrieved from backend
    X - confirm that note content is being set in editorContent state
    - load editorContent state into editor

      Pseudo code: Loading currentNote content into editor.
          -you have the current note, set in columns.tsx when notetitle is clicked, via setCurrentNote, which sets it to global state.
          -

    - confirm that editorContent is being loaded into editor
    - confirm that editorContent will load upon clicking of any notes in NotesDataTable.

  */

  console.log(
    `The value of currentNote.noteContent is now ${JSON.stringify(
      currentNote?.noteContent,
    )}`,
  )

  // dispatch in onchange has nada to do with loading the currentNote.noteContent into the editor. It should only be for saving content.
  return (
    <Plate
      editor={editorRef}
      initialValue={initialContent}
      currentNote={currentNote}
      currentNoteContent={currentNoteContent}
      plugins={plugins}
      onChange={(value) => {
        // setEditorContent(editorContent)
        if (editorContent && value) {
          console.log(`dispatching updateNote action with args (noteId, updatedNoteContent).
          Value of arg noteId: currentNote._id is ${currentNote._id}.
          Value of arg updatedNote is ${JSON.stringify(value)}.`)
          dispatch(
            updateNote({
              noteId: currentNote._id,
              updatedNote: { noteContent: JSON.stringify(value) },
            }),
          )
        }
      }}
    >
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>
      {/* placeholder prop has rendering & formatting issues; Replace with manual addition if necessary */}
      <Editor placeholder="" />
      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </Plate>
  )
}

// import { useState, useEffect } from 'react';
// import { Plate } from '@udecode/plate-common';
// import { Editor } from '@/components/plate-ui/editor'
// import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
// import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
// import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
// import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
// import plugins from '../plugins/plugins';
// import { useAppDispatch, useAppSelector } from '@/app/hooks';
// import { updateNote } from '@/features/notes/noteSlice';

// export function LocalStorageEditor() {
//   const dispatch = useAppDispatch();
//   const currentNote = useAppSelector(state => state.notes.currentNote);

//   const initialValue = [
//     {
//       id: '1',
//       type: 'p',
//       children: [{ text: 'Type here to start your note.' }],
//     },
//   ]

//   const [editorContent, setEditorContent] = useState();

//   // Update editor content when currentNote changes
//   useEffect(() => {
//     const content = currentNote ? JSON.parse(currentNote?.noteContent) : initialValue;
//     setEditorContent(content);
//   }, [currentNote]);

//   return (
//     <Plate
//       plugins={plugins}
//       value={editorContent}
//       onChange={newContent => {
//         setEditorContent(newContent);
//         if (currentNote) {
//           dispatch(updateNote({
//             noteId: currentNote._id,
//             updatedNoteContent: JSON.stringify(newContent),
//           }));
//         }
//       }}
//     >
//       <FixedToolbar>
//         <FixedToolbarButtons />
//       </FixedToolbar>
//       <Editor placeholder="Type here to start your note." />
//       <FloatingToolbar>
//         <FloatingToolbarButtons />
//       </FloatingToolbar>
//     </Plate>
//   );
// }
