import { createSlice } from '@reduxjs/toolkit'
import { createTypedAsyncThunk } from '@/app/hooks'
import projectService from '@/features/projects/projectService'
import type { RootState } from '../../app/store'
import { Project, ProjectDTO } from '@/types/types'
import { getErrorMessage } from '@/lib/axiosUtils'

interface ProjectState {
  projects: Project[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  message: string | null
}

const initialState: ProjectState = {
  projects: [],
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

//Create project
export const createProject = createTypedAsyncThunk(
  'projects/createProject',
  async (project: ProjectDTO, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await projectService.createProject(project, token)
      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Get projects
export const getProjects = createTypedAsyncThunk(
  'projects/getUserProjects',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      return await projectService.getProjects(token)
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Update project
export const updateProject = createTypedAsyncThunk(
  'projects/updateProject',
  async (
    args: { projectId: string; updatedProject: Partial<Project> },
    thunkAPI,
  ) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await projectService.updateProject(
        args.projectId,
        args.updatedProject,
        token,
      )
      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Duplicate Project
export const duplicateProject = createTypedAsyncThunk(
  'projects/duplicateProject',
  async (originalProject: Project, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await projectService.duplicateProject(
        originalProject,
        token,
      )

      return response
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Delete user project
export const deleteProject = createTypedAsyncThunk(
  'projects/deleteProject',
  async (projectId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const token = state.auth.user?.token

      if (!token) {
        throw new Error('Token is missing')
      }

      const response = await projectService.deleteProject(projectId, token)
      return { projectId, response }
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create Project
      .addCase(createProject.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects.push(action.payload)
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Use the error message from the rejected value
        state.message = 'Failed to create project.' // Set an error message
      })

      // Get Projects
      .addCase(getProjects.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects = action.payload
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to fetch projects.'
      })

      //Update Projects
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id,
        )
        //if findIndex() finds the project._id that is the update target, send that as the payload
        if (index !== -1) {
          state.projects[index] = action.payload
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string // Use the error message from the rejected value
        state.message = 'Failed to update project.' // Set an error message
      })

      //Duplicate Project
      .addCase(duplicateProject.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(duplicateProject.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects.push(action.payload)
      })
      .addCase(duplicateProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to duplicate project.'
      })

      //Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload.projectId,
        )
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
        state.message = 'Failed to delete project'
      })
  },
})

export default projectSlice.reducer
