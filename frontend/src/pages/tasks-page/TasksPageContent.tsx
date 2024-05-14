// import * as React from 'react'


// import { TasksDataTable } from '@/pages/tasks-page/components/table/TasksDataTable'
// import FormDialog from '@/components/FormDialog'
// import TaskForm from '@/pages/tasks-page/components/TaskForm'
// import { useFormDialogState } from '@/hooks/useFormDialogState'
// import { taskColumns } from '@/pages/tasks-page/components/table/task-columns'
// //import { useTasks } from '@/pages/tasks-page/TasksContext'
// import { Task } from '@/types/types'

// export default function TasksPageContent() {
//   Incomplete context implementation
//   const  {tasks}  = useTasks()
//   const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

//   // Debug log for attempted Context implementation
//   console.log("From Component TasksPageContent, Logging var 'tasks' has value:", tasks); 


//   return (
//     <div className="h-full flex-1 flex-col space-y-8 p-1.5 md:flex md:p-8 ">
//       <div className="flex items-center justify-between space-y-2">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//           <p className="text-muted-foreground">
//             Here is a list of your tasks for this month!
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
//       </div>
//       <div className="ml-auto space-">
//         <FormDialog
//           title="Create Task"
//           description="Fill out the form to create a new Task. Click save when you're done."
//           isOpen={isFormDialogOpen}
//           onFormSubmissionCloseDialog={handleFormDialogClose}
//           formComponent={<TaskForm onFormSubmit={handleFormDialogClose} />}
//         />
//       </div>
//       <TasksDataTable columns={taskColumns} data={tasks} />
//     </div>
//   )
// }
