import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
  

//Redux in TS: Use these pre-typed functions throughout app instead of plain `useDispatch` and `useSelector.
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



export const createTypedAsyncThunk = createAsyncThunk.withTypes<{
    rejectValue: string;
  }>();


//function to minimize AxiosError type checking code in thunk actions
export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
      return (
        error.response?.data?.error?.message || error.message || error.toString()
      );
    }
    return "An unknown error occurred.";
  }