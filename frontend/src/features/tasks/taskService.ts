import axios from 'axios'
import { Task, TaskDTO } from '@/types/types'
import { getConfig } from '@/lib/axiosUtils'

const API_URL = '/api/tasks/'

// HTTP requests to the backend made via appropriate Axios methods
// Auth token is sent as a Bearer token in the config arg of the Axios req. method via getConfig()

//Request to create new task
const createTask = async (task: TaskDTO, token: string) => {
  const response = await axios.post(API_URL, task, getConfig(token))
  return response.data
}

//Req to get user tasks
const getTasks = async (token: string) => {
  const response = await axios.get(API_URL, getConfig(token))
  return response.data
}

// Req to Update a Task
const updateTask = async (
  taskId: string,
  updatedTask: Partial<Task>,
  token: string,
) => {
  const response = await axios.put(
    API_URL + taskId,
    updatedTask,
    getConfig(token),
  )
  return response.data
}

/* Req to duplicate task 
    -Initializes a copy of the original task locally- "Copy" is appended to taskName,  and status of copiedTask is set to "In Progress".
    -Deletes the copiedTask's _id, createdAt, and updatedAt properties so they can be generated anew.
    -Sends the copiedTask in a post req to the backend, where Mongoose will create _id, createdAt, and updatedAt properties as if it was a new task.*/
// const duplicateTask = async (originalTask: Task, token: string) => {
//   const copiedTask: Task = {
//     ...originalTask,
//     taskName: `${originalTask.taskName} (Copy)`,
//     //populate
//     status: 'Underway',
//     priority: 'Low',
//   }
//   delete copiedTask._id, copiedTask.createdAt, copiedTask.updatedAt
//   const response = await axios.post(API_URL, copiedTask, getConfig(token))
//   return response.data
// }

//version with all properties but _id/created added to copiedTask manually:
// const duplicateTask = async (originalTask: Task, token: string) => {
//   const copiedTask = {
//     projectName: originalTask.projectName,
//     taskName: `${originalTask.taskName} (Copy)`,
//     taskDesctiption: originalTask.taskDescription,
//     client: originalTask.client,
//     label: originalTask.label,
//     status: 'Underway', //Assume default for copiedTask.
//     priority: 'Low',       //Assume default for copiedTask.
//   }
//   // delete copiedTask._id, copiedTask.createdAt, copiedTask.updatedAt
//   const response = await axios.post(API_URL, copiedTask, getConfig(token))
//   return response.data
// }

const duplicateTask = async (originalTask: Task, token: string) => {
  const { _id, createdAt, updatedAt, ...copiedTask } = originalTask;
    copiedTask.taskName = `${originalTask.taskName} (Copy)`
    copiedTask.status = 'Underway' //Assume default for copiedTask.
    copiedTask.priority = 'Low'       //Assume default for copiedTask.

  const response = await axios.post(API_URL, copiedTask, getConfig(token))
  return response.data
}

//Req to delete task
const deleteTask = async (taskId: string, token: string) => {
  const response = await axios.delete(API_URL + taskId, getConfig(token))
  return response.data
}

const taskService = {
  createTask,
  getTasks,
  updateTask,
  duplicateTask,
  deleteTask,
}

export default taskService
