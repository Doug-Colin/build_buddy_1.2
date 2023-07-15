/* 
    -features/auth: this folder represents the auth part of our Global State

    -features/auth/taskSlice.js: redux reducers and initial state go here 

    -In Redux, a slice is the portion of the Redux store responsible for managing a specific part of the app's state. A slice encapsulates the actions, reducers, and initial state related to a particular feature/page. By grouping related functionality together, it helps organize and modularize your Redux code.

    -Benefit of using redux toolkit is server response automatically goes into pending, fulfilled, or rejected (in authSlice), so we don't have to manually handle that
*/

/*****************Following steps are for slice (feature like tasks) - for auth, order may be different.***** */

/************************** First Step - necessary import and export statements  etc ***************************** */

//enables async functions & ability to create initial state from the server
//& import our authService http request file so we can use the register function
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'



/*************************** Second Step - declare initial state ******************************
    -(good practice is to use isError, isSuccess, isLoading, and message for every redux resource, with preceding state properties case dependent)
    -if issues with taskState, view in redux toolkit 
*/

const initialState = {
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

/* ************************** Third Step - createSlice - see end of file ****************************** /

/* ************************** Fourth step - create the relevant component(s) ******************************
    -for example, here would be TaskForm.jsx, which will handle the form submission etc.. 
*/

/* ************************** Fifth step - create the relevant function(s) ******************************
  -Create new task
  -routes needed are protected, unlike for login/register, so need the user token, which is in localStorage in our auth.user State..
  -so grab token via thunkAPI method .getState() (thunkAPI methods allow getting data from anywhere in state).
  -pass token into relevant service along with featureData
*/
export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.createTask(taskData, token)
  } catch (error) {
    //check for error messages wherever they could come from the server
    const message = (
      error.response &&
      error.response.data &&
      error.response.data.message) ||
      error.message ||
      error.toString()
    //error/failed request will reject and send the error message with the payload 
    return thunkAPI.rejectWithValue(message)   
  }
})

/* ******* Eighth step - GET -additional CRUD functionality in Slice.js ********************** 
-(READ) For example: add function for getTasks w/error handling, see getTasks **and** additional .addCase's in this files extraReducers. (NOTE - you can add getTasks function, then corresponding Service.js fnctn, then extraReducers in Slice.js. )
*/

/* ******* Ninth step - additional CRUD functionality in Service.js ********************** 
-After get function w/error handling in Slice.js file, add a corresponding get function to the Service.js file */

/* ******* Tenth step - additional CRUD functionality in Service.js ********************** 
  -in Dashboard.jsx (or relevant component) (see Dashboard.jsx for steps)
  */

/* **** Eleventh step - Create new component to display content- (see Dashboard.jsx > TaskItem.jsx) ***** */

//Get user tasks // fetch tasks from server
//since we're just getting tasks and not sending data, first arg is _, thunkAPI
//to get all tasks & get relevant user, we'll need token, so save to variable and return in Service.js 
export const getTasks = createAsyncThunk('tasks/getALL', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.getTasks(token)
  } catch (error) {
     const message = (
      error.response && 
      error.response.data && 
      error.response.data.message) || 
      error.message || 
      error.toString()
     return thunkAPI.rejectWithValue(message)  
  }
})

//Update user task
export const updateTask = createAsyncThunk('/tasks/update', async (data, thunkAPI) => {
  try {
      const {id, text} = data;
      // console.log('TaskSlice Update Data::. ', data);
      const token = thunkAPI.getState().auth.user.token;  //the thunkAPI can get state from local storage. Here, we grab our token which was passed alongside user in the state
      return await taskService.updateTask(id, text, token);
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);   //return the message as the payload
  }
});

//Delete user task
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.deleteTask(id, token)
  } catch (error) {
    //check for error messages wherever they could come from the server
    const message = (
      error.response &&
      error.response.data &&
      error.response.data.message) ||
      error.message ||
      error.toString()
    //error/failed request will reject and send the error message with the payload 
    return thunkAPI.rejectWithValue(message)   
  }
})
/* ************************** Sixth step - create/code relevant Service.js file ***************************** */



/*************************** Third Step - createSlice - see below ******************************
    -(extraReducers added later after steps four, five, and six)
    -export variable and assign createslice
    -pass an onject into createslice, with properties name, initialState, reducers: {}, extraReducers: {}
    -reset state in reducers (here we're resetting to initialState. With something like users/authSlice, )
    -add extraReducers (extraReducers is a fnctn that takes in a builder and calls it & addCases)
*/
/* ************ Seventh step - add extraReducers in createSlice for POST/CRUD CREATE functionality ************* */
/* ******* Ninth step? - additional addCase() in extraReducers for other CRUD requests *************************** */
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.tasks = state.tasks.map((task) => task._id !== action.payload._id ? task : action.payload)     //loop thr all Task items and replace the updated task
      })
      .addCase(updateTask.rejected, (state, action) => {
          state.isLoading = false
          state.isSuccess = false
          state.isError = true
          state.message = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = state.tasks.filter((task) => task._id !== action.payload.id)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

/*************************** Always - export reset from featureSlice.actions ******************************
    -the reset must be exported from the actions 
    -export the reducer itself, and in the redux store.js file, import it and add it to the configureStore() object
*/    
export const { reset } = taskSlice.actions
export default taskSlice.reducer