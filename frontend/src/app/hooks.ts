// Utils/typed wrappers specific to Redux & Redux Toolkit
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { createAsyncThunk } from '@reduxjs/toolkit'

// Typed wrappers for useDispatch & useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

//createTypedAsyncThunk: A typed wrapper for createAsyncThunk to handle reject values (reduces redundant code)
export const createTypedAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string
}>()
