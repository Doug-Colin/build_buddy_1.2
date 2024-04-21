import * as React from 'react'
import { createContext, useContext, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  duplicateTask,
} from '@/features/tasks/taskSlice'
//import { Task } from '@/types/types'

// Contexts for each feature ensure that

const TasksContext = createContext(null)

export const TasksProvider = ({ children }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const dispatch = useAppDispatch()

  // Fetch user tasks from Redux global state as soon as provider renders.
  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  const handleGetTasks = () => dispatch(getTasks())
  const handleCreateTask = (taskId) => dispatch(createTask(taskId))
  const handleUpdateTask = (taskId) => dispatch(updateTask(taskId))
  const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId))
  const handleDuplicateTask = (taskId) => dispatch(duplicateTask(taskId))

  const value = useMemo(
    () => ({
      tasks,
      dispatch,
      handleGetTasks,
      handleCreateTask,
      handleUpdateTask,
      handleDeleteTask,
      handleDuplicateTask,
    }),
    [tasks, dispatch],
  )

  return (
    <TasksContext.Provider value={{ value }}>{children}</TasksContext.Provider>
  )
}

export const useTasks = () => {
  useContext(TasksContext)
}
