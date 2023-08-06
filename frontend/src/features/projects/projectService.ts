import axios from "axios";

const API_URL = "/api/projects/";

//define type for properties or data of individual projects
export interface Project {
  _id?: string;
  user?: string;
  projectName: string;
  client?: string; //optional field
  dueDate: Date;
  status?: "In progress" | "Completed" | "Long-Term"; //optional field
  createdAt?: string;
  updatedAt?: string;
}

//Request to create new project
//send token as Bearer token
const createProject = async (project: Project, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //debugging
  console.log("Sending request with data:", project, "and config:", config);

  //respond to req with config, which has the token
  const response = await axios.post(API_URL, project, config);

  return response.data;
};

//Request to get user projects
const getProjects = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //respond to req with config, which has the token
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Request to Update a Project
const updateProject = async (
  projectId: string,
  updatedProject: Partial<Project>,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, //Prepend 'Bearer' to the raw token
    },
  };

  const response = await axios.put(API_URL + projectId, updatedProject, config);

  return response.data;
};

// //Request to duplicate project
const duplicateProject = async (originalProject: Project, token: string) => {
  const copiedProject: Project = {
    ...originalProject,
    projectName: `${originalProject.projectName} (Copy)`,
    status: "In progress",
  };
  delete copiedProject._id, copiedProject.createdAt, copiedProject.updatedAt;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, copiedProject, config);

  return response.data;
};

//Request to delete project
const deleteProject = async (projectId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //respond to req with config, which has the token
  const response = await axios.delete(API_URL + projectId, config);

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
