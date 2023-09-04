import axios from "axios";
import { Project } from "@/types/types";
import { getConfig } from "@/lib/axiosUtils";

const API_URL = "/api/projects/";

// HTTP requests to the backend made via appropriate Axios methods
// Auth token is sent as a Bearer token in the config arg of the Axios req. method via getConfig()

//Create project
const createProject = async (project: Project, token: string) => {
  const response = await axios.post(API_URL, project, getConfig(token))
  return response.data;
};

//Get user's projects
const getProjects = async (token: string) => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

// Update Project
const updateProject = async (
  projectId: string,
  updatedProject: Partial<Project>,
  token: string
) => {
  const response = await axios.put(
    API_URL + projectId,
    updatedProject,
    getConfig(token)
  );
  return response.data;
};

/* Duplicate project 
    -Initializes a copy of the original project locally- "Copy" is appended to projectName,  and status of copiedProject is set to "In progress".
    -Deletes the copiedProject's _id, createdAt, and updatedAt properties so they can be generated anew.
    -Sends the copiedProject in a post req to the backend, where Mongoose will create _id, createdAt, and updatedAt properties as if it was a new project.*/
const duplicateProject = async (originalProject: Project, token: string) => {
  const copiedProject: Project = {
    ...originalProject,
    projectName: `${originalProject.projectName} (Copy)`,
    status: "In progress",
  };
  delete copiedProject._id, copiedProject.createdAt, copiedProject.updatedAt;
  const response = await axios.post(API_URL, copiedProject, getConfig(token));
  return response.data;
};

//Delete project
const deleteProject = async (projectId: string, token: string) => {
  const response = await axios.delete(API_URL + projectId, getConfig(token));
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  updateProject,
  duplicateProject,
  deleteProject,
};

export default projectService;
