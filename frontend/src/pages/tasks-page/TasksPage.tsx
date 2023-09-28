import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { getTasks } from '@/features/tasks/taskSlice'
//import { getProjects } from '@/features/projects/projectSlice'

import { taskColumns } from '@/pages/tasks-page/components/table-updated/task-columns'
import { TasksDataTable } from '@/pages/tasks-page/components/table-updated/TasksDataTable'
import { Task } from '@/types/types'

export default function TasksPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.tasks)

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return (
    <Layout>
      <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <UserNav /> */}
          </div>
        </div>
        <TasksDataTable<Task, any> columns={taskColumns} data={tasks} />
      </div>
    </>
    </Layout>
  )
}

