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
import { Task, TaskDTO } from '@/types/types'

// Note : Should Context files go in a separate Contexts folder, or withint each feature pages local components folder?

// Contexts for each feature ensure that ...

const TasksContext = createContext(null)

export const TasksProvider = ({ children }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const dispatch = useAppDispatch()

  // Fetch user tasks from Redux global state as soon as provider renders.
  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  // Define handler functions for dispatching actions to Redux store so that all functions interacting with global tasks state are available in context provider.
  const handleGetTasks = () => dispatch(getTasks())
  const handleCreateTask = (task: TaskDTO) => dispatch(createTask(task))
  const handleUpdateTask = (taskId: string, updatedData: Partial<Task>) =>
    dispatch(updateTask({ taskId, updatedData }))
  const handleDeleteTask = (taskId: string) => dispatch(deleteTask(taskId))
  const handleDuplicateTask = (task: Task) => dispatch(duplicateTask(task))

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
