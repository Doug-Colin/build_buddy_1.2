import { useEditorRef } from '@udecode/plate-common'

export default function EditorWithSave() {
  const editor = useEditorRef()
  const currentNote = useAppSelector((state) => state.notes.currentNote)
  const dispatch = useAppDispatch()
  const [currentEditorContent, setCurrentEditorContent] =
    useState<MyValue>(placeholderText)
  const placeholderText = [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'Type here to start your note.' }],
    },
  ]
  useEffect(() => {
    const content = currentNote?.noteContent
      ? testJsonParse(currentNote.noteContent)
      : placeholderText
    setCurrentEditorContent(content)
  }, [currentNote])

  function testJsonParse(str: string) {
    try {
      return JSON.parse(str)
    } catch (e) {
      console.error('Error parsing JSON. error is:', e)
      return 'JSON parsing error. See Console for details.'
    }
  }

  useEffect(() => {
    if (currentNote && currentEditorContent) {
      dispatch(
        updateNote({
          _id: currentNote._id,
          noteContent: JSON.stringify(currentEditorContent),
        }),
      )
    }
  }, [currentEditorContent, currentNote, dispatch])

  return (
    <div>
      <Editor
        id="note-content"
        value={currentEditorContent}
        onChange={(newValue) => setCurrentEditorContent(newValue)}
        plugins={plugins}
        editorRef={editor}
      />
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>
      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    </div>
  )
}
