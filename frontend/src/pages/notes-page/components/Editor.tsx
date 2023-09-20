import React from 'react'
import { useState, useEffect } from 'react'
import '@mdxeditor/editor/style.css'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { ALL_PLUGINS } from './boilerplate'
//import type {MDXEditorMethods} from '@mdxeditor/editor/types'

export default function Editor() {
  const [markdown, setMarkdown] = useState(
    localStorage.getItem('markdownContent') || 'Type here to start a note ....',
  )

  /*
  Pseudo Code - notes Feature (functionality only)
   -need a splt pane, whether through shad or react split.
   -may need a state in editor to keep track of which note is being currently displayed (currentNoteId, setCurrentNoteId) = React.useState(
        (notes[0] && notes[0].id) || "". I will have ID's from each new note that goes to the backend via Mongoose. 
    )
    -createNote fucntionality:
     Scrimba:
        function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    -updateNote functionality
    -Delete and duplicate? Nah, duplicating 
  */
  const editorRef = React.useRef(null)

  useEffect(() => {
    //Will load from backend eventually as test (or move straight to redux)
    const locallyStoredNote = localStorage.getItem('markdownContent')
    if (locallyStoredNote) {
      setMarkdown(locallyStoredNote)
    } else {
      setMarkdown('Type here to start a note ...')
    }
  }, [])

  const handleEditorChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown)
    console.log(markdown)
    localStorage.setItem('markdownContent', newMarkdown)
    // *Debounce this once auto-saving is implemented* //
  }

  return (
    <MDXEditor
      /* 
      - className "custom-editor-theme" is for overriding shad/BuildBuddy styles.
      - conflicting styles were interfering with the rendering of text via the toolbar
      - once functionality is achieved, integrate styles. 
      */
      className="custom-editor-theme"
      ref={editorRef}
      markdown={markdown}
      onChange={handleEditorChange}
      plugins={ALL_PLUGINS}
    />
  )
}
