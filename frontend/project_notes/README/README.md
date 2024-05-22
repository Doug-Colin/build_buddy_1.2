# build_buddy_1.2

## Description

Build Buddy aims to solve administrative and project management challenges faced by small-scale manufacturing businesses by enabling users to easily manage, track, and duplicate company projects and their subsequent processes and tasks via an intuitive UI.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Roadmap](#roadmap)

## Technologies Used

### **Backend**

- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/index.html)
- [Express Async Handler](https://www.npmjs.com/package/express-async-handler)

### **Authentication**

- [JWT](https://jwt.io/introduction/)

### **Frontend**

- [React (TypeScript)](https://reactjs.org/docs/getting-started.html)
- [Vite](https://vitejs.dev/guide/)
- [shadcn/ui](https://shadcn.github.io/ui/)
- [Tanstack Table](https://tanstack.com/table/v8)

### **State Management**

- [Redux Toolkit](https://redux-toolkit.js.org/)

### **Form Handling**

- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)

### **HTTP Client**

- [Axios](https://axios-http.com/docs/intro)

### **Routing**

- [react-router](https://reactrouter.com/)

## Features

- **User Authentication and Authorization**: Secure JWT-based auth.
- **Project Dashboard**: Create, edit, update, manage, and duplicate projects and their associated tasks.
- **Task & Process Management**: Each project's processes can be easily documented, categorized, and duplicated, makeing it easy to retain employee knowledge.
- **(In Progress) Notes**: Rich-text editor for taking project & task specific or general notes.
- **(In Progress) Overview Dashboard**: View ongoing projects, their progress, recent notes at a glance.
- **(In Progress) Tools**: Have tools at hand for caclulating and converting industry-specific values.
- **(Upcoming) Contacts**: Integrate business contacts into project and process/task management.
- **(Upcoming) Cost Tracking**: Track costs of materials, vendors, and overhead costs by visualizing changes over time.

## Roadmap

### Q2 2023

- User Login, Registration, and Authentication
- Project Dashboard feature
- Task & Process Management feature

### Q3 2023

- Finalize Task & Process Management
- Implement Notes feature
- Integrate features into Overview Dashboard

### Q4 2023

- Implement Cost Tracking feature
- Add Estimate Generation feature
