import * as React from 'react'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { getTasks } from '@/features/tasks/taskSlice'

// For buildout of form ? (In the event of user creating a new task linked to a project that does not yet exist)
//import { getProjects } from '@/features/projects/projectSlice'
//import TasksPageContent from '@/pages/tasks-page/TasksPageContent'

import { taskColumns } from '@/pages/tasks-page/components/table/task-columns'
import { TasksDataTable } from '@/pages/tasks-page/components/table/TasksDataTable'
import { Task } from '@/types/types'

import FormDialog from '@/components/FormDialog'
import TaskForm from '@/pages/tasks-page/components/TaskForm'
import { useFormDialogState } from '@/hooks/useFormDialogState'




export default function TasksPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.tasks)

  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

  // Fetch user tasks on page load
  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return (
    <Layout>
      <>
        {/* <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex "> */}
        {/* Responsive padding fits more of the table on mobile screens. */}
        <div className="h-full flex-1 flex-col space-y-8 p-1.5 md:flex md:p-8 ">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here is a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* <UserNav /> */}
            </div>
          </div>
          <div className="ml-auto space-">
            <FormDialog
              title="Create Task"
              description="Fill out the form to create a new Task. Click save when you're done."
              isOpen={isFormDialogOpen}
              onFormSubmissionCloseDialog={handleFormDialogClose}
              formComponent={<TaskForm onFormSubmit={handleFormDialogClose} />}
            />
          </div>
          <TasksDataTable<Task, any> columns={taskColumns} data={tasks} />
        </div>
      </>
    </Layout>
  )
}
