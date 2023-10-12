import { useRef } from 'react'
import { useEditorRef } from '@udecode/plate-common'



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
// import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
// import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { HeadingElement } from '@/components/plate-ui/heading-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'



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

//--- get the updated content logged to the console & set in localstorage via temporary 'save' button. -------------

const SaveLogic = () => {
  const editor = useEditorRef();  // Use the hook to get editor reference

  // Function to log editor content to the console
  const getSaveValue = () => {
    if (editor) {
      console.info("editor.children", editor.children);
      const jsonString = JSON.stringify(editor.children, null, 2); 
      localStorage.setItem('note', jsonString);
    }
  };

  // Render the button within the Plate component
  return <button onClick={getSaveValue}>Save</button>;
};


export default function Editor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];

  return (
    <div className="relative">
      <PlateProvider plugins={plugins} initialValue={initialValue}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <div
          ref={containerRef}
          className={cn('relative flex max-w-[900px] overflow-x-auto')}
        >
          <Plate
            editableProps={
              {
                autoFocus: true,
                className: cn(
                  'relative max-w-full max-h-full leading-[1.4] outline-none [&_strong]:font-bold',
                  'min-h-[550px] px-[96px] py-16',
                )
              } as TEditableProps
            }
          >
            {/* <SaveLogic /> */}
            {/* <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar> */}
          </Plate>
        </div>
      </PlateProvider>
    </div>
  );
}