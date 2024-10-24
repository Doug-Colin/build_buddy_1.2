import { createSlice } from '@reduxjs/toolkit'
import { createTypedAsyncThunk } from '@/app/hooks'
import { getErrorMessage } from '@/lib/axiosUtils'
import taskService from '@/features/tasks/taskService'
import { Task, TaskDTO } from '@/types/types'
import type { RootState } from '../../app/store'

interface TaskState {
  tasks: Task[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  message: string | null
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
  message: null,
}

/*
  createAsyncThunk: a function that accepts two arguments: 
  - a string action type, and
  - a 'payload creator' callback that returns a promise (hence aysnc/ await); the promise contains the data you want to dispatch to the store.

  createTypedAsyncThunk: A typed wrapper for createAsyncThunk to handle reject values (reduce redundant code)
*/

//Create a task
export const createTask = createTypedAsyncThunk(
  'tasks/createTask',
  async (task: TaskDTO, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await taskService.createTask(task, token)
      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Get user's tasks.
export const getTasks = createTypedAsyncThunk(
  'tasks/getUserTasks',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing.')
      }

      return await taskService.getTasks(token)
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Update a task
export const updateTask = createTypedAsyncThunk(
  'tasks/updateTask',
  async (args: { taskId: string; updatedData: Partial<Task> }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await taskService.updateTask(
        args.taskId,
        args.updatedData,
        token,
      )
      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Duplicate Task
export const duplicateTask = createTypedAsyncThunk(
  'tasks/duplicateTask',
  async (originalTask: Task, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await taskService.duplicateTask(originalTask, token)

      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Delete user task
export const deleteTask = createTypedAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await taskService.deleteTask(taskId, token)
      return { taskId, response }
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Create Task
      .addCase(createTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Use the error message from the rejected value
        state.message = 'Failed to create task.' // Set an error message
      })

      // Get Tasks
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to fetch tasks.'
      })

      //Update Tasks
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id,
        )
        //if findIndex() finds the task._id that is the update target, send that as the payload
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to update task.'
      })

      //Duplicate Task
      .addCase(duplicateTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(duplicateTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks.push(action.payload)
      })
      .addCase(duplicateTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to duplicate task.'
      })

      //Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.taskId,
        )
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to delete task'
      })
  },
})

export default taskSlice.reducer
