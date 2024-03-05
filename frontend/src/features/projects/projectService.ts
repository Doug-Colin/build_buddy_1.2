import axios from 'axios'
import { Project, ProjectDTO } from '@/types/types'
import { getConfig } from '@/lib/axiosUtils'

const API_URL = '/api/projects/'

// HTTP requests to the backend made via appropriate Axios methods
// Auth token is sent as a Bearer token in the config arg of the Axios req. method via getConfig()

//Create project
const createProject = async (project: ProjectDTO, token: string) => {
  const response = await axios.post(API_URL, project, getConfig(token))
  return response.data
}

//Get user's projects
const getProjects = async (token: string) => {
  const response = await axios.get(API_URL, getConfig(token))
  return response.data
}

// Update Project
const updateProject = async (
  projectId: string,
  updatedProject: Partial<Project>,
  token: string,
) => {
  const response = await axios.put(
    API_URL + projectId,
    updatedProject,
    getConfig(token),
  )
  return response.data
}

const duplicateProject = async (originalProject: Project, token: string) => {
  const { _id, createdAt, updatedAt, ...copiedProject } = originalProject
  copiedProject.projectName = `${originalProject.projectName} (Copy)`
  copiedProject.status = 'In Progress' //Assume default for copiedProject's status.

  const response = await axios.post(API_URL, copiedProject, getConfig(token))
  return response.data
}

//Delete project
const deleteProject = async (projectId: string, token: string) => {
  const response = await axios.delete(API_URL + projectId, getConfig(token))
  return response.data
}

const projectService = {
  createProject,
  getProjects,
  updateProject,
  duplicateProject,
  deleteProject,
}

export default projectService
