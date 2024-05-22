### Brief description of App

Our app is a project management/documentation tool for small businesses, built using the MERN stack with a Vite scaffold. It leverages the following technologies:

### Frontend:

React TypeScript, Redux Toolkit for state management, React Router, shadcn radix-based headless components, PlateJS for rich text editing, and Axios for API requests.

### Backend:

Node.js/Express with CRUD plus Duplication functionality, JWT for authentication, Mongoose for schema modeling, and MongoDB for the NoSQL database (chosen to more easily loosely associate projects, tasks, information, notes, and clients in the app).

### Target Audience

Small manufacturing, trade, arts, and other small businesses lacking dedicated administrative staff.

### Value Proposition

Small businesses often lack documentation of their core processes, leading to:

- Inefficient employee onboarding and training.
- Solving the same problem multiple times across similar projects, because solutions were not documented, often being lost with employees.
- Time lost in searching for project-related data in disorganized information.
- Difficulty performing cost, profit, and inflation analyses due to relevant information being buried in physical piles or deeply nested email chains.  

By managing projects and documenting processes in one place, businesseses can avoid these problems, saving time, money, and frustration, and more easily competing with businesses large enough to have dedicated administrative staff. 

### Our app provides intuitive documentation and project management through the following features:

#### Note on feature Layout/UI: Each feature makes use of two primary views:

- the default view, a responsive Data Table in which users can view all feature items (individual projects, tasks, notes, clients) as rows in a Data Table with sortable columns displaying the relevant properties of that feature item. (This view is well along, putting the final touches on the responsiveness of the data table)
- The individual feature item view, which displays the relevant properties of the feature item and allows the user to edit the properties of the feature item (Note, Layout/UI: This view is not yet started, so we could use advice on structuring it, for ex. should this view all be within a form? What are conventions used in programming and webapps with this stack when developers want users to be able to edit the various displayed properties of a user specific object like a project or task?).

#### Projects Feature:

Each project has as client, and the user can add project-specific tasks, and project specific notes. Users can create proejcts via a from and more importantly _duplicate_ them, so that identical or similar projects can be be created more efficiently, with their core processes and tasks intact. Feature is functional with a card UI, but needs to be migrated to DataTable UI

#### Tasks Feature:

Each task has a project, with the ability to attach notes to individual tasks (sub-tasks to come after MVP), and view and manage tasks by sorting them in the data table view according to properties like dueDate, priority, and Status, and edit such properties after clicking on the individual task to access that tasks details in the item view. (Note, Tasks feature: We currently have the create task form up and running, and users can select projects from a dropdown showing that users projects, though we're unsure of how to navigate the issue of a user creating a task for a project that doesn't exist yet). Feature is currently functional, though form UI needs some work, and Responsive version of data table has not been pushed to production yet.  

#### Notes:

Notes are either attached to a relevant task & thus that tasks project, but we also want users to be able to create notes on a client. Feature currently functional, but may not be attached to notes or projects feature yet. 

### Clients:

Similar to above features but for clients and featuring client-specific details/properties such as clientName, clientAddress, clientBillingAddress, createdAt and updatedAt, etc. 

(Features Note- Though these features are well along (with the exception of clients), we are wondering if our approach to structuring the app is the best approach. We are currently considereing refactoring code to avoid the need to prop-drill or use the REact context API by "Lifting State Up", carefully composing the component tree, and using the {children}. )

(Features Note 2- Though these features are well along (with the exception of clients), we are wondering if our approach to structuring the app's data is the best approach. Currently, we have the following object properties for eact feature-item:)

### Key MVP Development Goals:

Overview Dashboard
Projects Page
Tasks Page
Notes Page
Clients Page (planned addition)

### Post MVP Development Goals Under Consideration (priotitized by value:required resources):

Tiered Authentication (Admin, Manager, User) with tier-dependent permissions to be later determined.
SubTasks
Create Project from group of tasks?
Create Task from group of sub-tasks?
Project and Task Time-Tracking
Project and Task Time-Tracking analysis/breakdown
Project and Task Cost-tracking
Project and Task Cost analysis/breakdown

#### Interconnected Features

#### Features are interconnected for intuitive navigation and to minimize the friction of creating documentation.

Projects are linked to clients, or non-client categories like Maintenance, Training, Onboarding, Accounting etc, and have their own tasks.

Tasks are linked to projects (Not sure if this is necessary,
(Note: it would be nice to be able to see all tasks for a project in one place, and to be able to sort them by dueDate, priority, and status. Currently they can all be viewed in one place by simply sorting the data table by project, but ).

Notes can be linked to tasks, projects, or clients for easy navigation and comprehensive documentation.

By integrating these features, the app aims to streamline administrative tasks, improve documentation, and ultimately save time and money for small businesses.

Thanks. So I've been reading about the performance issues react context could cause due to re-rendering., and I've read that these are best avoided by using Context for strictly global state, and not to avoid prop-drilling, which is best avoided by a combination of carefully composing your components, and 'Lifting state up" to pass it via the {children} prop.

### Initial, less brief description of App

Our app is a project that uses Mern stack, specifically Vite scaffold, React TS, Redux Toolkit for global state management, React Router, headless shadcn components, rich text editing via PlateJS ( a plugin system built atop and for JS RTE), and Axios for seamless requests to the backend. The backend is a simple Node/Express server in JS featuring CRUD functionality and JWT authorization & authentication, Mongoose for things like Model schemas, and MongoDB as the database.

It's a project management/documentation app targeted towards small manufacturing/trade/arts/crafts businesses (at this point, probably any small businesses).

The value proposition is that such small businesses are disadvantaged by their lack of admin staff; unlike larger businesses, they don't have the resources to have dedicated administrative staff, so owners/managers wear multiple hats to take care of admin work. Without a dedicated admin staff, and owners/managers weariung multiple hats, small businesses often end up lacking in documentation of projects and core business processes. Because of this, they lose time and money in the following ways:

-inefficient employee onboarding and training processes: Without documentation of core processes, newly trained employees require more of the trainers time, in initial training and during the process of learning it. This is time that the trainer could be doing more valuable things. Without that documentation, more time is lost whenever a newer employees seeks clarification or makes mistakes on fundamental tasks and processes. A maintencance check list is a simple example of documentation that would help in this situation. But how well writter is it? How do employees get clarification?

-Businesses lose time and money when repeating projects or tasks without documentation. Projects that are repeated or similar to each other, along with tasks of projects that are similar, should become more efficient and profitable when repeated, as the that neded solving on the first iteration of the project are already solved. But if those solutions and processes and task or challenge breakdowns are not documented, they will need to be solved again to a degree; the money and time lost to this issue increasess as time lapses between repetition of similar projects and tasks and processes, and also if the employees performing the task or project on each iteration are not the same employee that performed them on the last iteration.

-Businesses lose time and money to disorganized information. Searching through a labyrinthe of file folders (or worse, a binder or notebook) for notes, images, specifications, and solutions related to a project takes time. The more organized and easy to access that information is, the less time a business loses to finding it. The more organized it is, the quicker and easier it is able to be navigated by

The app provides value by combining easy documentation with minimally opinionated project management in an intuitive UI that's easy to use for non-tech-savvy individuals (of which there are many in manufacturing). The documentation is via a notes RTE editor featuring images and video, wherein notes can be attached to projects, tasks (and eventually subtasks), and clients.

Currently the four primary pages and features of the project MVP are as follows:
-Overview Dashboard Page
-Projects Page/feature
-Tasks Page/feature
-Notes Page/feature
-Clients Page (Not yet part of MVP but may could make sense to add as notes and projects currently have a 'client' property.)

For organization of user/business data, intuitive use, and ease of navigation, the features in the project will be connected to each other. For example, we want the users to always be able to see what client a project is for, so they'll be prompted that when submitting the form for creating new projects. Similarly, tasks will be connected to projects, and notes will be connected to tasks, projects, and clients.

---

### Thorough App Description and Current State of Development

My project is a MERN app with react-router and a RESTful API backend.

Currently, the backend is built using MongoDB, Mongoose, Node, and Express; current complete include JWT authorization and user authentication for registration and login, CRUD functionality for the projects, tasks, and the registration of users, and error handling via Async Error handler.

Currently, the frontend uses a Vite TS React scaffold, routing via react router, shadcn components, forms via react-hook-form, validation via zod, Redux toolkit service and slice files for global state management with createAsycnThunks, Axios API calls, and Plate rich text editor, a plugin system for Slate RTE with shadcn based components.

As far as the frontend goes, the landing page is looking pretty good, login and registration apges/forms and zod validation for them with and error handling work and look good. Login or nto logged in redirection looks good and works.

The projects page feature looks good, all the Projects are rendered as cards with completion status, project name, client, dueDate, and create, edit, duplicate, and delete are working and communicating with the backend and db succesfully, UI is pretty presentable.

Tasks page/feature is looking decent, the are rendedred in a shadcn-tanstack table with sortable status and priority columns, and theres a bar theat lets users filter tasks by project, a button to create a task, a button to select which columns to view/hide, and previous and next pages for navigating pagination of the table. Ui needs work, and create form needs to give the user option of creating a new project when creating a task (tasks must be linked to projects for duplicateability of both simultaneously), but otherwise taskform is working with vaildation. Ui needs a bit of work but I'd say its close to MVP for now.

Notes feature is next, I've got a working and styled editor in there with Bold, Italic, underline, strikethough, and codeblock options for text, a button where you can change from editing to viewing (viewing clears the toolbar and clicking it displays a dropdown where you could choose edit mode again, redisplaying the toolbar and allowing editing. )Theres also a plus button in the toolbar when in edit mode for adding a 'new block', paragraoh, headings, and quote. This looks good but I haven't connected it to the backend, haven't written the model and controller for it on backend, and theres no way currently to create a new note or save notes or navigate through them. I have plans for this, it's up next, but for now I figured I gotta work on my resume, clean up github, and get my github profile (which is why we're making a good readme/roadmap now) to a nice presentable state. then maybe I'll try to get the app into production build, sort out bugs, and publish/host it soemwhere.

I began the app in JS via a c-r-a scaffold with my own components, and made progress on some features and ui, but have moved it to a Vite TS React scaffold with the aforementioned tools and libraries.

Again, the app has three primary goals, or purposes:

1. to serve as the capstone project for my portfolio, and demonstrate my skills and value to prospective companies whom I am hoping to work for.
2. to provide narrative to prospective employers for my career transition from working and managing in fabrication and small-scale manufacturing, to software development, by demonstrating that I built an app that solves real business problems that I was facing in my previous roles.
3. The third purpose of the app is the app's purpose outside of my career and the problem it seeks to solve: The app will help small-scale business owners with the administrative chores of running their business so that they can concentrate on applying their industry-specific skill in building or manufacturing or fabricating, rather than get bogged down with administrative tasks. The target audience is owners and employers and managers in the creative, craft, trade, manufacturing, and fabrication industries.

here were the total planned features of the app:

-landing page. This is currently fully functional, though the layout could use some minor tweaks.

-user registration and login, with authentication and authorization via JWT. This is currently fully functional, forms look good and work, though they're not dialogs yet.

-Projects dashboard- at MVP status more or less, had ability to create different projects so that users can click back into that project to work on it and use other features in relation to it. Create Project form is a reusable FormDialog component, looks good. Considering adding labels to projects like Tasks curretly have (maintenance, admin, fabrication, finishing etc) but leaving it alone for now.

-Task management dashboard: Near MVP status; as described before, could use some UI tweaks but maybe there. Considering adding a split pane where users can view scrollable projects and pick one to dispplay all tasks from that project. Alternately, could display a row above each group of tasks with project name. That or the split pane would also clear the 'projectName' and 'client' from the individual tasks, which would make it look a lot cleaner. Ideally want to add duplication and subtasks, so company processes that are repetitive coudl easily be duplicated for new projects that are similar or projects that are repeated. Also on wishlist is a time estimated to completion field, and and actual time spent on task display, wherien each task is displayed in rows, but with an added two-part 'time' field, preceded by a clock icon. The first part of the 'time' field will allow users to set the 'estimated time to completion', likely titled simply 'estimated'. The second part of the 'time' field will allow the user to track the actual time spent on the task, and will render live like a stopwatch displaying hours and minutes. The user will be able to press or click in order to start and stop the time tracker, and also to be able to set the task as complete (I'm not sure if this is something that should be accomplished via the task 'status' column or another button).

-Notes: feature as far along as described before, I'd like to give users the ability to take and make general notes and notes that will be specific to projects, including ongoing projects like maintenance/procurement. I chose a library/framework to utilize for this (plate, a Rich Text Editor plugin system and primitive component library for Slate, with CLI for styled components built on shadcn components), and tested incorporating it, so far just have the editor working, but no crud functionality or backend tests ey. For now, it will feature text only, but possibly after MVP I will incorporate images.

-Contacts: not worked on at all, but considering I'd like a contacts feature where users can input contacts and sort them, by type (client, vendor, employee, etc). This feature is not yet functional, I haven't done any relevant coding at all.

-Cost entry and tracking: not worked on at all, but I'd like users to be able to enter vendor, material, and overhead costs. I spent some time thinking this feature out, the goal is to readily provide the user with feedback on increases in costs, ideally displayed as a graph, so that they can better understand how much to adjust their ongoing estimates and invoices. But the inputs are labyrinthine (take for example metal materials alone- they can be of shape-types such as sheet, bar, channel, hex-bar, square tube, and round tube. In addition, the metal will have a dimensions, such as 3/4" thick x 12" x24" sheet, 3"x3/4"x3ft long bar, 1" tall x 3" wide x 6' rectangular bar...) so definitely leaving that for non-MVP, and maybe scratching it overal to polish present features.

...)Thus, I suppose it makes sense to have an input for type of cost (material, subcontractor/service, shipping and handling, overhead, labor), and then an input for sub-type of cost (metal, paint, finishing, lumber, hardwood, clay, cleaning-supplies etc), perhaps an input for cost structure (per piece, per service, per month, etc) and perhaps an input for recurrence of cost (monthly, yearly). I could use advice on thinking this feature through, but what I imagined generally was a feature that makes it as easy as possible for users to input costs, and perhaps having qualifiers that are saved upon entry could benefit this greatly (take for example metal materials alone- they can be of shape-types such as sheet, bar, channel, hex-bar, square tube, and round tube. In addition, the metal will have a dimensions, such as 3/4" thick x 12" x24" sheet, 3"x3/4"x3ft long bar, 1" tall x 3" wide x 6' rectangular bar... theres a TON of options here and prepoulating all of them for even metal would be a lot of work, so I imagine the user being able to enter qualifiers such as shape, and dimension, and then those qualifies will be saved to the 'metal' type of materials for easier future cost entry.) Obviously there's a lot to figure out with this feature. This feature is not yet functional, I haven't done any relevant coding at all.

-Estimate generating: I'd like users to be able to generate pdf estimates that automatically take into account the increase in material or vendor prices, or at least prompt the user whether they want to adjust those items on the estimate accordingly, for example the prompt 'this material is 15% for expensive than last purchase- would you like to adjust this invoice for that?. I'm imagining that users could have the option of displaying invoices as estimated or note.

-Calculations: this feature will enable users to make calculations specific to their industry, such as carpentry, ceramics, painting, lighting, etc. In addition will be general calculators for things like triangle angles and side lengths, circle diameter/radius/circumference, and surface area. I had this feature fucntioning on the old JS version of my app but have not begun porting it to the new version. I would like to add the functionality of the user being able to save calculations to notes, whether project specific or general. I completed this feature on the old JS version of my app but have not begun porting it to the new version.

- Unit-Conversions: this feature allows users to select from a large category of types of unit-conversions, and then from a subcategory of units specific to that type, adn then to convert between units such as km and miles or inches and cm or celcius and fahrenheit. I completed this feature on the old JS version of my app but have not begun porting it to the new version. I would like to add the functionality of the user being able to save unit-conversions to notes, whether project specific or general.

Now, what I need you help with, is considering the goals or purposes of this app, I want you to tell me which features are best to finish for the MVP version. I need to get the MVP done soon, ideally in a week, so I can start applying to jobs. My plan is to add the other features to a roadmap on my github repo. Please have the MVP features or design accomodate the possibility of adding the non-mvp features.

I will need help with decisions regarding the UI, and understanding exactly which steps I need to undertake to achieve the MVP features step by step, and then eventually also responsiveness. But for now, let me know what you think about MVP features, then we can work on implementing them one by one.
