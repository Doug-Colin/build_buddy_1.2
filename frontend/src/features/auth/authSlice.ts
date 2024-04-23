import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { User, LoginUserData, RegisterUserData } from '@/types/types'
import { createTypedAsyncThunk } from '@/app/hooks'
import { getErrorMessage } from '@/lib/axiosUtils'

//Get user from local storage; becomes part of global redux store upon initialization
const user: User = JSON.parse(localStorage.getItem('user') || 'null')

//Types for initialState
export interface AuthState {
  user: User | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

// Initial state
const initialState: AuthState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false, // For loading animation (spinner etc).
  message: '',
}

/*
  createAsyncThunk: a function that accepts two arguments: 
  - a string action type, and
  - a 'payload creator' callback that returns a promise (hence aysnc/ await); the promise contains the data you want to dispatch to the store.

  createTypedAsyncThunk: A typed wrapper for createAsyncThunk to handle reject values (reduce redundant code)
*/

//Thunk action to register user; handles Axios-specific and general errors with help of getErrorMessage()
export const register = createTypedAsyncThunk<User, RegisterUserData>(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error: unknown) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

//Thunk action to login user; handles Axios-specific and general errors with help of getErrorMessage()
export const login = createAsyncThunk<
  User,
  LoginUserData,
  { rejectValue: string }
>('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error: unknown) {
    const message = getErrorMessage(error)
    return thunkAPI.rejectWithValue(message)
  }
})

//Thunk action to logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Create slice with typed state & payload
export const authSlice = createSlice({
  name: 'auth',
  initialState,

  // reducers - synchronous actions.
  reducers: {
    reset: (state: AuthState) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },

  // extraReducers - async actions
  extraReducers: (builder) => {
    builder
      //actions fired upon register submission.
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })

      //actions fired upon login submission.
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state: AuthState, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload //action.payload is response from backend
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload ?? 'An unexpected error occurred.' //payload is error message to return in thunk's catch block
        state.user = null
      })

      // handle logout action.
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
