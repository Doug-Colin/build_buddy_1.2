import * as React from 'react'
import { createContext, useContext } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

const TasksContext = createContext(null)

export const TasksProvider = ({ children }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const dispatch = useAppDispatch()

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => { useContext(TasksContext) }
