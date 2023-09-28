import { useEffect } from 'react'

import Layout from '@/components/Layout'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { columns } from '@/pages/tasks-page/components/tasks-table/columns'
import { DataTable } from '@/pages/tasks-page/components/tasks-table/data-table'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { getTasks } from '@/features/tasks/taskSlice'

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
      <div className="">
        <DataTable columns={columns} data={tasks} />
      </div>
    </Layout>
  )
}
