import { useRef } from 'react'
import { Nullable, useEditorRef } from '@udecode/plate-common'
import { Note, NoteDTO } from '@/types/types'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { updateNote } from '@/features/notes/noteSlice'
import { useEffect } from 'react'

import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import {
  ELEMENT_BLOCKQUOTE,
  createBlockquotePlugin,
} from '@udecode/plate-block-quote'
import {
  Plate,
  PlateLeaf,
  PlateProvider,
  TEditableProps,
  createPlugins,
  withProps,
} from '@udecode/plate-common'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  createHeadingPlugin,
} from '@udecode/plate-heading'
import {
  ELEMENT_PARAGRAPH,
  createParagraphPlugin,
} from '@udecode/plate-paragraph'

import { cn } from '@/lib/utils'
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element'
import { CodeLeaf } from '@/components/plate-ui/code-leaf'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { HeadingElement } from '@/components/plate-ui/heading-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'
import { MyValue } from '@/types/plate-types'

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
  ],
  {
    components: {
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
      [MARK_CODE]: CodeLeaf,
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    },
  },
)



interface EditorProps {
  currentNoteId?: string | null
  currentNoteContent?: string | null
}


export default function Editor(
  currentNoteId?: string | null,
  currentNoteContent?: string | null
) {
  const containerRef = useRef(null)

  //--- get the updated content logged to the console & set in localstorage via temporary 'save' button. -------------
const SaveLogic = (currentNoteId: string | null | {}, currentNoteContent: string | null | {}) => {
  const dispatch = useAppDispatch()
  const editor = useEditorRef() // Use the hook to get editor reference

  //const currentNote = useAppSelector((state) => state.notes.currentNote)
  const stringified = JSON.stringify(editor.children)
  const parsed = JSON.parse(stringified)

  // Function to log editor content to the console
  const handleSaveClick = (currentNoteId, currentNoteContent) => {

    if (editor) {
      console.log(
        `Currently accessing editor via var editor = useEditorRef().
   editor.children value is currently:
    ${editor.children}
    
    After being passed into JSON.stringify(), editor.children value is now 
    ${stringified} 
    
    
    After stringified version is passed into JSON.parse(), editor.children value is now 
    ${parsed}
    
    The value of currentNote is currently ${currentNote}
    
    The value of currentNote.noteContent is currently ${currentNote.noteContent}
    
    The value of currentNote._id is currently ${currentNote?._id}
    `,
      )

      const editorContent = editor.children
      dispatch(updateNote(currentNoteId, currentNoteContent));
    }
  }

  return <button onClick={handleSaveClick(currentNoteId, currentNoteContent)}>Save</button>
}

  const initialValue = [
    {
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Type here to start your first note.' }],
    },
  ]

  return (
    <div className="relative">
      <PlateProvider plugins={plugins} initialValue={initialValue}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <div
          ref={containerRef}
          // className={cn('relative flex max-w-[900px] overflow-x-auto')}
          className={cn('relative flex overflow-x-auto')}
        >
          <Plate
            editableProps={
              {
                autoFocus: true,
                className: cn(
                  'relative max-w-full leading-[1.4] outline-none [&_strong]:font-bold',
                  '!min-h-[600px] w-[900px] px-[96px] py-16',
                ),
              } as TEditableProps
            }
          >
            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <SaveLogic currentNoteId={currentNoteId} onClick/>
            {/* <SaveLogic /> */}
          </Plate>
        </div>
      </PlateProvider>
    </div>
  )
}
