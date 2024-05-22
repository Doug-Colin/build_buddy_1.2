The app in this currently open directory is a project that uses Mern stack, specifically Vite scaffold, React TS, Redux Toolkit for global state management, React Router, headless shadcn components, rich text editing via Plate ( a plugin system built atop and for Slate RTE), and Axios for seamless requests to the backend.

The backend is currently a simple Node/Express server in JS featuring CRUD functionality and JWT authorization & authentication.

It's a project management/documentation app targeted towards small manufacturing/trade/arts/crafts businesses (at this point, probably any small businesses).

It is also a personal project that I am creating to prove to prospective employers that I can make professional level products, or am capable of the work necessary to land a junior or mid tier frontend development role. So I want to create a project that has a balance of observing best practices, and approaching decisions and/or using problem solving approaches that are common-sense, and not dogmatic.

I'm currently working on the Notes feature, which utilizes Plate Rich TExt Editor, a plugin system for Slate RTE.

I successfully have user notes from the backend being displayed in the NotesDataTable.tsx component that is

For the remainder of this conversation, remember from this prompt what my stack is.

I currently am working on the Notes feature. I have NoteForm.tsx, via a FormDialog component on NotesPage.tsx, succesfully creating new forms for users. The new note obejcts have a note.content property of null. The use of a form here is because I want the user to only be able to create notes that are connected to specific projects, tasks, or clients, so as to keep the documentation notes organized. Thus the user note objects created by this form have a .noteContent property that is null.

I also have these user note objects being displayed in NotesDataTable.tsx, where the user can click on the .noteTitle property value in the first column of the table to select the current note to be loaded into the editor. Currently this only logs the note object to the console, but we want to make it so that is loads the selectedNote's content into the editor, and so that the content the user is typing and altering in the editor is tracked and saved automatically,

I know I need to add saving and debouncing to the PlateEditor. It needs to send the correct data type for the .noteContent to the backend. But I'm not sure how to procedd with this. Please take a look at the relevant files in directories frontend/src/features/notes (contains redux toolkit service and slice files) and frontend/src/pages/notes-page (contains NotesPage.tsx, the NotesDataTable, the editor, the columns.tsx etc)

I need a guide on how to properly, considering the stack used, get the above functionality working.
