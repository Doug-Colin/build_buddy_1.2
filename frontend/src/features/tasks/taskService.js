import axios from 'axios'

const API_URL = '/api/tasks/'

//Request to create new task
//send token as Bearer token
const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    //respond to req with config, which has the token
    const response = await axios.post(API_URL, taskData, config) 
    
    return response.data
}

/* ******* Ninth step - additional CRUD functionality in Service.js ********************** 
-After get function w/error handling in Slice.js file, add a corresponding get function to the Service.js file 
-can copy most of code from initial create/POST function above. */

//Request to get user tasks
const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    //respond to req with config, which has the token
    const response = await axios.get(API_URL, config) 
    
    return response.data
}

// Request to Update a Task
const updateTask = async (taskId, taskData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`    //Prepend 'Bearer' to the raw token
        }
    }

    const response = await axios.put(API_URL + taskId, {text:taskData}, config);  //path/:id

    return response.data;
}

//Request to delete task
const deleteTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    //respond to req with config, which has the token
    const response = await axios.delete(API_URL + taskId, config) 
    
    return response.data
}


const taskService = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
}

export default taskService
