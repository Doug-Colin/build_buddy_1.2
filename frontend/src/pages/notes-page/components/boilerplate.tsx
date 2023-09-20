
//Plugins for editor functionality.
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
// //allowedHeadingLevels config param enables limiting allowed headings (See GitHub Discussions #2}
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { linkPlugin } from '@mdxeditor/editor/plugins/link'; 
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { Separator } from '@mdxeditor/editor/plugins/toolbar/primitives/toolbar';
import { imagePlugin } from "@mdxeditor/editor"
//Toolbar components.
import { InsertImage } from '@mdxeditor/editor/plugins/toolbar/components/InsertImage';
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect';
import { CreateLink } from '@mdxeditor/editor/plugins/toolbar/components/CreateLink';
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';


  export const ALL_PLUGINS = [
    toolbarPlugin({
      toolbarContents: () =>  (
        <>
          <UndoRedo />
          <Separator />
          <BlockTypeSelect />
          <Separator />
          <BoldItalicUnderlineToggles />
          <Separator />
          <CreateLink />
          <Separator />
          <ListsToggle />
          <Separator />
          <InsertImage />
        </>
      ),
    }),
    headingsPlugin(), 
    listsPlugin(), 
    quotePlugin(), 
    thematicBreakPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin(({ imageUploadHandler: async () => Promise.resolve('https://picsum.photos/200/300') }))
  ]
