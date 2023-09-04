import axios from "axios";
import { Task } from "@/types/types";
import { getConfig } from "@/lib/axiosUtils";

const API_URL = "/api/tasks/";

// HTTP requests to the backend made via appropriate Axios methods
// Auth token is sent as a Bearer token in the config arg of the Axios req. method via getConfig()

//Request to create new task
const createTask = async (task: Task, token: string) => {
  const response = await axios.post(API_URL, task, getConfig(token));
  return response.data;
};

//Req to get user tasks
const getTasks = async (token: string) => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

// Req to Update a Task
const updateTask = async (
  taskId: string,
  updatedTask: Partial<Task>,
  token: string
) => {
  const response = await axios.put(API_URL + taskId, updatedTask, getConfig(token));
  return response.data;
};

/* Req to duplicate task 
    -Initializes a copy of the original task locally- "Copy" is appended to taskName,  and status of copiedTask is set to "In progress".
    -Deletes the copiedTask's _id, createdAt, and updatedAt properties so they can be generated anew.
    -Sends the copiedTask in a post req to the backend, where Mongoose will create _id, createdAt, and updatedAt properties as if it was a new task.*/
const duplicateTask = async (originalTask: Task, token: string) => {
  const copiedTask: Task = {
    ...originalTask,
    taskName: `${originalTask.taskName} (Copy)`,
    //populate
    status: "In Progress",
    priority: "Low"
  };
  delete copiedTask._id, copiedTask.createdAt, copiedTask.updatedAt;
  const response = await axios.post(API_URL, copiedTask, getConfig(token));
  return response.data;
};

//Req to delete task
const deleteTask = async (taskId: string, token: string) => {
  const response = await axios.delete(API_URL + taskId, getConfig(token));
  return response.data;
};


const taskService = {
  createTask,
  getTasks,
  updateTask,
  duplicateTask,
  deleteTask,
};

export default taskService;
