
// import { createSlice } from '@reduxjs/toolkit'
// //redux service not yet needed- see below note 
// //import convertService from './convertService'

// //---------- NOTE - Not currently using AsyncThunk as this state does not yet need to be communicated to the backend. Once notes functionality is implemented, that function will be needed here to enable 'Add converted units to project notes' function (in addition to the extraReducers for async error handling)

// //define initial state values
// const initialState = {
//   category: '',
//   value: 0,
//   currentUnit: 'cm',
//   newUnit: 'in',
//   result: 0,
// }

// //create slice and export
// export const convertSlice = createSlice({
//   name: 'convert',
//   initialState,
//   reducers: {
//     setCategory(state, action) {
//       state.category = action.payload
//     },
//     setValue(state, action) {
//       state.value = action.payload;
//     },
//     setCurrentUnit(state, action) {
//       state.currentUnit = action.payload
//     },
//     setNewUnit(state, action) {
//       state.newUnit = action.payload
//     },
//     setResult(state, action) {
//       state.result = action.payload
//     }
//   }
// })

// //export the actions generated by createSlice above 
// export const { setCategory, setValue , setCurrentUnit , setNewUnit , setResult } = convertSlice.actions;

// //export the reducer
// export default convertSlice.reducer