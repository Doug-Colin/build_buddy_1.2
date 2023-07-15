
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import taskReducer from '../features/tasks/taskSlice'
import convertReducer from '../features/convert/convertSlice'


export const store = configureStore({
    reducer: {
      auth: authReducer,
      tasks: taskReducer,
      convert: convertReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
      }),
  })


  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >