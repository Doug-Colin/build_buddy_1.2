import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import projectReducer from '@/features/projects/projectSlice'
import taskReducer from '@/features/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//type AppThunk is custom type definition for redux thunks.
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, // type value thunk will return- defaults to `void` if not specified.
  RootState, // type of state in Redux store.
  unknown, // type for extra arguments thunk may take. None yet so `unknown`.
  Action<string> // type for actions thunk may dispatch; can dispatch any action with string type.
>
