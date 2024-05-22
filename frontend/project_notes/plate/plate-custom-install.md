## Installation

Here is your *personalized* installation guide based on the plugins and components you have selected.
For a more general guide, please refer to the [Getting Started](https://platejs.org/docs/getting-started) section.

### Install Plate

Start from our [template](https://github.com/udecode/plate-template) or install the peer dependencies and Plate:

```bash
npminstall react react-dom slate slate-react slate-history slate-hyperscript
npminstall @udecode/plate-common @udecode/cn
```

Copy

### Install Plugins

Install your selected plugins:

```bash
npminstall @udecode/plate-paragraph @udecode/plate-heading @udecode/plate-block-quote @udecode/plate-horizontal-rule @udecode/plate-link @udecode/plate-media @udecode/plate-caption @udecode/plate-list @udecode/plate-basic-marks @udecode/plate-font @udecode/plate-highlight @udecode/plate-kbd @udecode/plate-alignment @udecode/plate-indent @udecode/plate-indent-list @udecode/plate-line-height @udecode/plate-break @udecode/plate-node-id @udecode/plate-select @udecode/plate-serializer-docx @udecode/plate-serializer-csv @udecode/plate-serializer-md @udecode/plate-juice
```

Copy

### Add Components

[Install the dependencies for the components](https://platejs.org/docs/components/installation) and [configure the CLI](https://platejs.org/docs/components/cli). Then, add the components you have selected:

```bash
npx @udecode/plate-ui@latest add blockquote-element hr-element image-element link-element link-floating-toolbar heading-element paragraph-element todo-list-element highlight-leaf kbd-leaf editor fixed-toolbar fixed-toolbar-buttons floating-toolbar floating-toolbar-buttons placeholder
```

Copy


### Imports

All the imports you need:

```typescript
import{ withProps }from'@udecode/cn';
import{ createPlugins,Plate,RenderAfterEditable,PlateLeaf}from'@udecode/plate-common';
import{ createParagraphPlugin,ELEMENT_PARAGRAPH}from'@udecode/plate-paragraph';
import{ createHeadingPlugin,ELEMENT_H1,ELEMENT_H2,ELEMENT_H3,ELEMENT_H4,ELEMENT_H5,ELEMENT_H6}from'@udecode/plate-heading';
import{ createBlockquotePlugin,ELEMENT_BLOCKQUOTE}from'@udecode/plate-block-quote';
import{ createHorizontalRulePlugin,ELEMENT_HR}from'@udecode/plate-horizontal-rule';
import{ createLinkPlugin,ELEMENT_LINK}from'@udecode/plate-link';
import{ createImagePlugin,ELEMENT_IMAGE}from'@udecode/plate-media';
import{ createCaptionPlugin }from'@udecode/plate-caption';
import{ createTodoListPlugin,ELEMENT_TODO_LI}from'@udecode/plate-list';
import{ createBoldPlugin,MARK_BOLD, createItalicPlugin,MARK_ITALIC, createUnderlinePlugin,MARK_UNDERLINE, createStrikethroughPlugin,MARK_STRIKETHROUGH, createSubscriptPlugin,MARK_SUBSCRIPT, createSuperscriptPlugin,MARK_SUPERSCRIPT}from'@udecode/plate-basic-marks';
import{ createFontColorPlugin, createFontSizePlugin }from'@udecode/plate-font';
import{ createHighlightPlugin,MARK_HIGHLIGHT}from'@udecode/plate-highlight';
import{ createKbdPlugin,MARK_KBD}from'@udecode/plate-kbd';
import{ createAlignPlugin }from'@udecode/plate-alignment';
import{ createIndentPlugin }from'@udecode/plate-indent';
import{ createIndentListPlugin }from'@udecode/plate-indent-list';
import{ createLineHeightPlugin }from'@udecode/plate-line-height';
import{ createExitBreakPlugin }from'@udecode/plate-break';
import{ createNodeIdPlugin }from'@udecode/plate-node-id';
import{ createDeletePlugin }from'@udecode/plate-select';
import{ createDeserializeDocxPlugin }from'@udecode/plate-serializer-docx';
import{ createDeserializeCsvPlugin }from'@udecode/plate-serializer-csv';
import{ createDeserializeMdPlugin }from'@udecode/plate-serializer-md';
import{ createJuicePlugin }from'@udecode/plate-juice';

import{BlockquoteElement}from'@/components/plate-ui/blockquote-element';
import{HrElement}from'@/components/plate-ui/hr-element';
import{ImageElement}from'@/components/plate-ui/image-element';
import{LinkElement}from'@/components/plate-ui/link-element';
import{LinkFloatingToolbar}from'@/components/plate-ui/link-floating-toolbar';
import{HeadingElement}from'@/components/plate-ui/heading-element';
import{ParagraphElement}from'@/components/plate-ui/paragraph-element';
import{TodoListElement}from'@/components/plate-ui/todo-list-element';
import{HighlightLeaf}from'@/components/plate-ui/highlight-leaf';
import{KbdLeaf}from'@/components/plate-ui/kbd-leaf';
import{Editor}from'@/components/plate-ui/editor';
import{FixedToolbar}from'@/components/plate-ui/fixed-toolbar';
import{FixedToolbarButtons}from'@/components/plate-ui/fixed-toolbar-buttons';
import{FloatingToolbar}from'@/components/plate-ui/floating-toolbar';
import{FloatingToolbarButtons}from'@/components/plate-ui/floating-toolbar-buttons';
import{ withPlaceholders }from'@/components/plate-ui/placeholder';
```

Copy

### Create Plugins

Create your plugins and link your components into them.

```typescript
const plugins =createPlugins(
[
createParagraphPlugin(),
createHeadingPlugin(),
createBlockquotePlugin(),
createHorizontalRulePlugin(),
createLinkPlugin({
      renderAfterEditable:LinkFloatingToolbarasRenderAfterEditable,
}),
createImagePlugin(),
createCaptionPlugin({
      options:{
        pluginKeys:[
// ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
]
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
      inject:{
        props:{
          validTypes:[
ELEMENT_PARAGRAPH,
// ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
],
},
},
}),
createIndentPlugin({
      inject:{
        props:{
          validTypes:[
ELEMENT_PARAGRAPH,
// ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
],
},
},
}),
createIndentListPlugin({
      inject:{
        props:{
          validTypes:[
ELEMENT_PARAGRAPH,
// ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
],
},
},
}),
createLineHeightPlugin({
      inject:{
        props:{
          defaultNodeValue:1.5,
          validNodeValues:[1,1.2,1.5,2,3],
          validTypes:[
ELEMENT_PARAGRAPH,
// ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
],
},
},
}),
createExitBreakPlugin({
      options:{
        rules:[
{
            hotkey:'mod+enter',
},
{
            hotkey:'mod+shift+enter',
            before:true,
},
{
            hotkey:'enter',
            query:{
              start:true,
              end:true,
// allow: KEYS_HEADING,
},
            relative:true,
            level:1,
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
    components:withPlaceholders({
[ELEMENT_BLOCKQUOTE]:BlockquoteElement,
[ELEMENT_HR]:HrElement,
[ELEMENT_IMAGE]:ImageElement,
[ELEMENT_LINK]:LinkElement,
[ELEMENT_H1]:withProps(HeadingElement,{ variant:'h1'}),
[ELEMENT_H2]:withProps(HeadingElement,{ variant:'h2'}),
[ELEMENT_H3]:withProps(HeadingElement,{ variant:'h3'}),
[ELEMENT_H4]:withProps(HeadingElement,{ variant:'h4'}),
[ELEMENT_H5]:withProps(HeadingElement,{ variant:'h5'}),
[ELEMENT_H6]:withProps(HeadingElement,{ variant:'h6'}),
[ELEMENT_PARAGRAPH]:ParagraphElement,
[ELEMENT_TODO_LI]:TodoListElement,
[MARK_BOLD]:withProps(PlateLeaf,{as:'strong'}),
[MARK_HIGHLIGHT]:HighlightLeaf,
[MARK_ITALIC]:withProps(PlateLeaf,{as:'em'}),
[MARK_KBD]:KbdLeaf,
[MARK_STRIKETHROUGH]:withProps(PlateLeaf,{as:'s'}),
[MARK_SUBSCRIPT]:withProps(PlateLeaf,{as:'sub'}),
[MARK_SUPERSCRIPT]:withProps(PlateLeaf,{as:'sup'}),
[MARK_UNDERLINE]:withProps(PlateLeaf,{as:'u'}),
}),
}
);
```

Copy

### Finally, render the editor

```typescript
const initialValue =[
{
    id:'1',
    type:'p',
    children:[{ text:'Hello, World!'}],
},
];

exportfunctionPlateEditor(){
return(
<Plate plugins={plugins} initialValue={initialValue}>
<FixedToolbar>
<FixedToolbarButtons/>
</FixedToolbar>
  
<Editor/>
  
<FloatingToolbar>
<FloatingToolbarButtons/>
</FloatingToolbar>
</Plate>
);
}
```
