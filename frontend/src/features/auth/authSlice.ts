//when using Redux in TS, we always define generated actions uusing PayloadAction<T> type from Redux toolkit. It takes the type of the action.payload field as its generic argument.
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'  //import RootState type from store file here


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

//need JSON web token to access protected routes, so grab it from user's local storage 
//parse the JSON since loc. storage can only have strings
const user = JSON.parse(localStorage.getItem('user'))

//Define a type for the slice state
interface AuthState {
    value: //i'm not sure what to put here- a union type of boolean | string? Not sure what to put for the user state variable. 
}

//if issues with authState, view in redux toolkit 
const initialState: Authstate = {
    user: user ? user : null,  //if there's a user, use it, otherwise null
    isError: false,    //will be made true if server responds with error, so we can handle error
    isSuccess: false,  //will be made true if server req/res is successfull.
    isLoading: false,  //used for loading spinner
    message: '',
}

// Register user async thunk function
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user) //returns the payload coming back from register fnctn in the service
    } catch (error) {
        //check for error messages wherever they could come from the server
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        //error/failed request will reject and send the error message with the payload 
        return thunkAPI.rejectWithValue(message)   
    }
})

// Login user async thunk function
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user) //returns the payload coming back from register fnctn in the service
    } catch (error) {
        //check for error messages wherever they could come from the server
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        //error/failed request will reject and send the error message with the payload 
        return thunkAPI.rejectWithValue(message)   
    }
})

// Logout user async thunk function
export const logout = createAsyncThunk('auth/logout',
async () => {
    await authService.logout()
})

//create the slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //anything defined in reducers won't be asynchronous and won't be thunk functions
    //reset (regular reducer func.) enables resetting state to default values (for ex. after registering new user)
    //since we want the user persists, we won't reset state to initialState, and instead reset all properties exept user 
    reducers: { 
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }, 
    },
    //async & thunk functions go here
    //extraReducers handle the different states of the registration process  (pending/fulfilled/succesfull) and update state accordingly
    extraReducers: (builder) => {
        builder
            //account for the different actions that will be fired related upon *register* submission
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
                state.message = action.payload //update state mssg prprty with action.payload (error message) to return in above catch block
                state.user = null
            })
            //account for the different actions that will be fired related upon *login* submission
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload //action.payload is the response from the backend
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload //payload is error message to return in above catch block
                state.user = null
            }) 
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })        
    }, 
})

//export authSlice so we can import it in src/app/store.js
//reducers like reset must be exported from authSlice.actions

export const { reset } = authSlice.actions
export default authSlice.reducer