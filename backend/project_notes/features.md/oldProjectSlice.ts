//------------------------ Old --------------------------------------------------

// import { createSlice } from "@reduxjs/toolkit";
// import projectService from "./projectService";
// import { Project, ProjectData } from "@/features/projects/projectService";
// import axios from "axios";
// import { createTypedAsyncThunk } from "@/app/hooks";
// // import { user } from '@/app/store'
// //If writing selector functions, may need to import Rootstate, as per Redux+TS docs
// import type { RootState } from "../../app/store";

// //define types for the initialState object
// interface ProjectState {
//   projects: Project[];
//   selectedProject?: Project;
//   isError: boolean;
//   isSuccess: boolean;
//   isLoading: boolean;
//   message: string;
// }

// //declare initial state
// const initialState: ProjectState = {
//   projects: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// type UpdateProjectArgs = {
//   id: string;
//   data: ProjectData;
// };

// /**
//  * fn to minimize AxiosError type checking code in thunk actions
//  */
// function getErrorMessage(error: unknown): string {
//   if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
//     return (
//       error.response?.data?.error?.message || error.message || error.toString()
//     );
//   }
//   return "An unknown error occurred.";
// }

// export const createProject = createTypedAsyncThunk<
//   Project, //return type
//   ProjectData //payload type
// >("projects/create", async (project, thunkAPI) => {
//   try {
//     const state = thunkAPI.getState() as RootState;
//     const token = state.auth.user?.token;

//     if (!token) {
//       throw new Error("Token is missing");
//     }
//     return await projectService.createProject(project, token);

//   } catch (error) {
//     const message = getErrorMessage(error);
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// //Get user projects // fetch projects from server
// //get request &  not sending data, so pass thunkAPI as first arg
// //save login token to variable and return in Service.js to authorize requests
// export const getProjects = createTypedAsyncThunk<Project[], void>(
//   "projects/getUserProjects",
//   async (_, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState() as RootState;
//       const token = state.auth.user?.token;

//       if (!token) {
//         throw new Error("Token is missing");
//       }

//       return await projectService.getProjects(token);
//     } catch (error) {
//       const message = getErrorMessage(error);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// //Update user project
// export const updateProject = createTypedAsyncThunk<Project, UpdateProjectArgs>(
//   "/projects/updateProject",
//   async (data, thunkAPI) => {
//     try {
//       //add correct properties below
//       const { id, ...updatedProjectData } = data;
//       console.log('ProjectSlice Update Data:', data);

//       const state = thunkAPI.getState() as RootState;
//       const token = state.auth.user?.token;

//       if (!token) {
//         throw new Error("Token is missing");
//       }
//       return await projectService.updateProject(id, updatedProjectData, token);
//     } catch (error) {
//       const message = getErrorMessage(error);

//       return thunkAPI.rejectWithValue(message); //return the message as the payload
//     }
//   }
// );

// //Delete user project
// export const deleteProject = createTypedAsyncThunk<
//   { id: string },
//   string,
//   { rejectValue: string }
// >("projects/deleteProject", async (id, thunkAPI) => {
//   try {
//     const state = thunkAPI.getState() as RootState;
//     const token = state.auth.user?.token;

//     if (!token) {
//       throw new Error("Token is missing");
//     }

//     return await projectService.deleteProject(id, token);
//   } catch (error) {
//     //check for error messages wherever they could come from the server
//     const message = getErrorMessage(error);
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// export const projectSlice = createSlice({
//   name: "project",
//   initialState: [],
//   reducers: {
//     //currently state param is not being used so feel free to get rid of it if not necessary as TS flags it
//     reset: (state: ProjectState) => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProject.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createProject.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.projects.push(action.payload);
//       })
//       .addCase(createProject.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload as string;
//       })
//       .addCase(getProjects.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProjects.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.projects = action.payload;
//       })
//       .addCase(getProjects.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload as string;
//       })
//       .addCase(updateProject.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateProject.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.projects = state.projects.map((project) =>
//           project._id !== action.payload._id ? project : action.payload
//         ); //loop through all project properties & replace the updated project
//       })
//       .addCase(updateProject.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = false;
//         state.isError = true;
//         state.message = action.payload as string;
//       })
//       .addCase(deleteProject.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteProject.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.projects = state.projects.filter(
//           (project) => project._id !== action.payload.id
//         );
//       })
//       .addCase(deleteProject.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload as string;
//       });
//   },
// });

// export const { reset } = projectSlice.actions;
// export default projectSlice.reducer;
