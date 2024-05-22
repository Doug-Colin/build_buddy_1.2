Steps taken to add plate to Vite scaffolded shadcn project:

-Plate components will not install if you have "tsx": true in your components.json. This setting is from the shadcn initialization process (if you setup as a TS project). Changing it to false allows the JSX version of shadcn components to be installed. You can simple remove it.

-INSTALL UDE: npm install @udecode/plate-common slate slate-react slate-history slate-hyperscript react react-dom (note- there's two other options: ""Alternatively you can install **`@udecode/plate`** that contains all the packages excluding the ones with additional dependencies (e.g.  **`@udecode/plate-dnd`** ). "" -https://platejs.org/docs/getting-started)

-put plate-types.tsx in your types folder  https://platejs.org/docs/typescript (rename My if you'd like to your project.. instr.)

-Now you can install any components. (ACTUALLY UDE STEP MAY NOT HAVE BEEN NECESSARY, CAN TRY ANOTHER DAY)

MAking the PLATE TEMPLATE (not playground)

-after above, install all the necessary components:

`npx @udecode/plate-ui@latest add code-leaf dropdown-menu fixed-toolbar-buttons fixed-toolbar floating-toolbar-buttons floating-toolbar heading-element insert-dropdown-menu mark-toolbar-button mode-dropdown-menu more-drowdown-menu paragraph-element separator toggle toolbar tooltip turn-into-dropdown-menu.tsx`

-

plate-types:


-why are the imports

// Plate delivers a structured typing layer built on top of Slate, which primarily employs generic types.

// Differences with Slate types:

// Editor type: Plate introduces TEditor`<V>`, where V symbolizes the "value" that Slate edits. In a generic editor, V would correspond to TElement[], as this is what the editor accepts as children. However, in a custom editor, V might be defined as TEditor<Array<Paragraph | Quote>>.

// Methods related to TEditor and TNode: These methods have also been made generic. For instance, when you call getLeafNode(editor, path), it is recognized that the return value is a TText node. More specifically, it recognizes the text node of the type defined in your custom elements, along with any marks you've defined. The TEditor type in Plate does not correspond to the Editor type in Slate, hence, Plate has introduced type-only forks of all Slate methods that use Editor, which you should utilize. See the full list in Slate and Slate React.

// Declaration merging approach: Plate's use of generic types supersedes the declaration merging approach, offering several benefits. One issue with declaration merging was the inability to distinguish between an "unknown" and a "known" element as the underlying type was changed. Similarly, managing two editors on a page with different schemas was not possible. The use of generics in Plate, however, can smoothly replace the declaration merging approach while facilitating an easy migration. You can continue to pass the same custom element definitions into TEditor.

// Example of Defining Types in plate-types.ts:

// The following example outlines the types in plate-types.ts:

// The MyValue type, which will serve as the type of our editor.children.

// MyValue is a crucial type since most core types derive from it.

// Types following MyValue are optional, yet highly recommended. The process of writing generic types can be repetitive, so aim to do it just once.

// A set of typed functions are also included for your use.

// Naming Convention:

// We use T...Element because ...Element is already utilized by Plate UI components, and we wish to avoid naming conflicts among imports. The T... prefix also differentiates Plate types from Slate types.

// My is used for consumer types of the library. It's succinct and unambiguous. You could substitute it with the tag name of your project.
