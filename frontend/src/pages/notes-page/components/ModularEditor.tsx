// Plate dependencies, components, plugins, and types.
import { Plate } from '@udecode/plate-common'
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import plugins from '../plugins/plugins'
import { MyValue } from '@/types/plate-types'


interface ModularEditorProps {
  editorRef: any
  initialContent: MyValue
  editorKey?: string
  //currentNote: Note,
  onChange: (initialContent: MyValue) => void
 // isPlaceHolderVisible: boolean
}

export default function ModularEditor({
  editorRef,
  editorKey,
  initialContent,
  onChange,
}: ModularEditorProps) {

/* 
Alternate handleSave; checks for AST changes as per Slate Doc's & dispatches updateNote() accordingly.

const saveAstContentChange = (newValue: MyValue) => {
     const isAstChange = newValue.some(n => n.type !== 'selection');
     if (isAstChange && currentNote?._id) {
       const updatedContent = JSON.stringify(newValue);
       dispatch(updateNote({
         noteId: currentNote._id,
         updatedNote: { noteContent: updatedContent },
       }));
    }
*/

  return (
    <Plate
      key={editorKey}
      editorRef={editorRef}
      initialValue={initialContent}
      plugins={plugins}
      onChange={onChange}
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
