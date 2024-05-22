/* Checkout this code from my new setup of the Plate editor, via the new repo:

import { withProps } from '@udecode/cn'
import {
  createPlugins,
  Plate,
  RenderAfterEditable,
  PlateLeaf,
} from '@udecode/plate-common'
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph'
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from '@udecode/plate-block-quote'
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from '@udecode/plate-horizontal-rule'
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link'
import { createImagePlugin, ELEMENT_IMAGE } from '@udecode/plate-media'
import { createCaptionPlugin } from '@udecode/plate-caption'
import { createTodoListPlugin, ELEMENT_TODO_LI } from '@udecode/plate-list'
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT,
} from '@udecode/plate-basic-marks'
import {
  createFontColorPlugin,
  createFontSizePlugin,
} from '@udecode/plate-font'
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight'
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd'
import { createAlignPlugin } from '@udecode/plate-alignment'
import { createIndentPlugin } from '@udecode/plate-indent'
import { createIndentListPlugin } from '@udecode/plate-indent-list'
import { createLineHeightPlugin } from '@udecode/plate-line-height'
import { createExitBreakPlugin } from '@udecode/plate-break'
import { createNodeIdPlugin } from '@udecode/plate-node-id'
import { createDeletePlugin } from '@udecode/plate-select'
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx'
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv'
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md'
import { createJuicePlugin } from '@udecode/plate-juice'

import { BlockquoteElement } from '@/components/plate-ui/blockquote-element'
import { HrElement } from '@/components/plate-ui/hr-element'
import { ImageElement } from '@/components/plate-ui/image-element'
import { LinkElement } from '@/components/plate-ui/link-element'
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar'
import { HeadingElement } from '@/components/plate-ui/heading-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'
import { TodoListElement } from '@/components/plate-ui/todo-list-element'
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf'
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf'
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { withPlaceholders } from '@/components/plate-ui/placeholder'

import { useState } from 'react'
import { MyValue } from '@/types/plate-types'

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ],
      },
    }),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter',
          },
          {
            hotkey: 'mod+shift+enter',
            before: true,
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createDeletePlugin(),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: withPlaceholders({
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_HR]: HrElement,
      [ELEMENT_IMAGE]: ImageElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
      [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
      [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_TODO_LI]: TodoListElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
      [MARK_KBD]: KbdLeaf,
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
    }),
  },
)

const initialValue = [
  {
    id: '1',
    type: 'p',
    children: [{ text: 'Hello, World!' }],
  },
]

export function PlateEditor() {
  const [editorContent, setEditorContent] = useState<MyValue>(initialValue)

  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(newContent) => {
        setEditorContent(newContent)
        console.log(`After running setEditorContent(newContent), variable newContent is now ${JSON.stringify(newContent)}`)
        console.log(`state variable editorContent is now ${JSON.stringify(editorContent)}`)
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
Could be a great blog post- don't forget to be vulnerable/open-minded, approach it with a 'I have more experience buidling physical things than digital/virtual- this is how I think about approaching software projects, from a higher-level/birds eye view. What do you think I'm missing? Its key to know what problems you need to solve if you want to work efficiently, and this is all about that (from a 10,000 ft view)
YOU FORGOT TO FUCKING PSUEDO CODE. DUDE, NEVER FORGET TO PSUEDO CODE.(could be great to write a beginners guide to programming/software- you should always start with psuedo code. That is how you break what you are doing down into smaller chunks. Then take on those chunks one at a time. If it can be further broken down, do it. If you find an area you may need to research in, save that for later, just psuedo code out the whole feature/functionality/component/app, anbd continue to refine it until you know exactly what you need to do, even if that is 'understand how basic programs or webapps are structured', which would mean researching such. After that understanding is gained you can write more explicit psuedo code. You don't want to reseeacrch every little but of a project at first of course; it will be tough initially, to balance out time spent learning about tools and approaches to a problem, vs actually using them to solve the problem. And you will have many, many experiences of learning and using a tool or library to solve a problem, and then after investing hours or days or at worst months, you may run into a problem that renders that tool or library unsuitable for your use case, or incapable of solving your problem. Understanding requirements and planning out a project and limiting its scope to the intended pain point, business problem, or user need is crucial to avoiding these issues. The more your technical requirements are defined, the more you'll be able to identify the problems you need to solve. The better your understanding of tools and libraries is, the more you'll be able to efficiently utilize them, preventing dead-end tool adoptions, features, data structures, etc.

Explain to me, in simple terms, how useState() and onChange are working here. I understand it as follows, if I'm misunderstanding anything, please identify what exactly it is and explain the accurate understanding to me. 

As far as I understand, upon mounting of the PlateEditor component, state variable editorContent is set to the default value of variable initialValue.

WHenever the user types in the editor, the Plate component's onChange prop function uses the state setter function from useState() to set the editorContent state variable to the new value of the editor, as altered by the user. 

If I want that to persist, I need to:
- use onChange to either log it to local storage or send it to the backend (first try local storage. You didn't get the content persisting through local storage yet, do that, before you work on any backend/db integration). 

- Then, upon mounting, I want to check the editor for initialization with a ternary and if the selected note.Content is NOT null, I want to use the state setter function setEditorContent to set that to the editorContent variable, or the initialContent variable (though perhaps setting that outside of the editor is poor practice). 

-Need a way to remember which note is seleceted, that's via currentNote and setCurrentNote. 

-needCurrentNote to persist, so that if user goes to another feature page and comes back, it's there. ASK HOW TO MAKE SURE THIS IS DONE PROPERLY

-need to figure out how to send the editorCOntent back and forth into DB. This may take further alignment of Types (<Partial>Note seems no good), and further JSON.stringify and JSON.parse. Later you could move to storing it/convertying it to and from Markdown, as other businesses using PLate RTE say its the most robust way".

-Start getting these changes onto Main. 


Remember, don't load content into the editor until it is initialized. 
  
 I will also need to 


*/
