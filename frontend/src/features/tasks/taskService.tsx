import axios from "axios";

const API_URL = "/api/tasks/";

//define type for properties or data of individual tasks
export interface Task {
  _id?: string;
  user?: string;
  projectName: string;
  client?: string;
  label: string;
  taskName: string;
  taskDescription: string;
  status: "Todo" | "In Progress" | "Done" | "Paused" | "Canceled";
  priority: "Low" | "Medium" | "High" | "Urgent"; 
  createdAt?: string;
  updatedAt?: string;
}



//Request to create new task
//send token as Bearer token
const createTask = async (task: Task, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //debugging
  console.log("Sending request with data:", task, "and config:", config);

  //respond to req with config, which has the token
  const response = await axios.post(API_URL, task, config);

  return response.data;
};

//Req to get user tasks
const getTasks = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //respond to req with config, which has the token
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Req to Update a Task
const updateTask = async (
  taskId: string,
  updatedTask: Partial<Task>,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, //Prepend 'Bearer' to the raw token
    },
  };

  const response = await axios.put(API_URL + taskId, updatedTask, config);

  return response.data;
};

//Req to duplicate task
const duplicateTask = async (originalTask: Task, token: string) => {
  const copiedTask: Task = {
    ...originalTask,
    taskName: `${originalTask.taskName} (Copy)`,

    //populate
    status: "In Progress",
    priority: "Low"
  };
  delete copiedTask._id, copiedTask.createdAt, copiedTask.updatedAt;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, copiedTask, config);

  return response.data;
};

//Req to delete task
const deleteTask = async (taskId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //respond to req with config, which has the token
  const response = await axios.delete(API_URL + taskId, config);

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
