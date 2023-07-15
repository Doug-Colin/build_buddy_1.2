import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//If writing selector functions, may need to import Rootstate, as per Redux+TS docs
//import type { RootState } from "../../app/store";
import axios from "axios";
import authService from "./authService";
import { User, RegisterUserData } from "./authService";

//define the types for the initialState object
interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Check Redux toolkit if experiencing any authState issues.
// Retrieve JWT from user's local storage for protected routes.
// Local storage stores strings, so parse the JSON.
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"), //if there's a user, use it, otherwise null
  isError: false, // True if server error occurs.
  isSuccess: false, // True on successful server response.
  isLoading: false, // For loading spinner.
  message: "",
};

/**
 * fn to minimize AxiosError type checking code in thunk actions
 */
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
    return (
      error.response?.data?.error?.message || error.message || error.toString()
    );
  }
  return "An unknown error occurred.";
}

/**
 * Thunk action to register user; handles Axios-specific and general errors with help of getErrorMessage()
 */
export const register = createAsyncThunk<
  User,
  RegisterUserData,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Thunk action to login user; handles Axios-specific and general errors with help of getErrorMessage()
 */
export const login = createAsyncThunk<
  User,
  RegisterUserData,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Thunk action to logout user
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Create a slice with typed state and payload.
export const authSlice = createSlice({
  name: "auth",
  initialState,

  // Reducers for synchronous actions.
  reducers: {
    // 'Reset' state properties, retaining the user.
    reset: (state: AuthState) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  // Handle asynchronous actions using extraReducers.
  extraReducers: (builder) => {
    builder
      // Handle actions fired upon register submission.
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload) {
          state.user = action.payload;
        } else {
          state.isError = true;
          state.message = "Unexpected error: No user data returned";
        }
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //update state msg prprty to action.payload (error msg)
        // '??' TS nullish coalescing operator
        state.message = action.payload ?? "An unexpected error occurred";
        state.user = null;
      })

      // Handle actions fired upon login submission.
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //action.payload is response from backend
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? "An unexpected error occurred."; //payload is error message to return in thunk's catch block
        state.user = null;
      })

      // Handle logout action.
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//export authSlice so we can import it in src/app/store.js
//reducers like reset must be exported from authSlice.actions
export const { reset } = authSlice.actions;
export default authSlice.reducer;
