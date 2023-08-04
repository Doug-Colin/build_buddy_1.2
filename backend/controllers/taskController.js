//installed express-async-handler package (so we can use it instead of try-catch)
const asyncHandler = require("express-async-handler") 

const Task = require('../models/taskModel')
const User = require('../models/userModel')

//descr: Get task
//route: GET /api/tasks
//access: Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id })

    res.status(200).json(tasks)// 
})

   


//descr: Set task
//route: POST /api/tasks
//access: Private
////Express sends errors as html, so setup middleware.js so we can send JSON, & require/app.use it in server.js
const setTask = asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }
  
    const task = await Task.create({
      text: req.body.text,
      user: req.user._id,
    })
  
    res.status(200).json(task)
  })

//descr: Update task
//route: PUT /api/tasks/:id
//access: Private
const updateTask = asyncHandler(async (req, res) => {
    //get task by id in url
    const task = await Task.findById(req.params.id) 

    //check for task
    if (!task) {
        res.status(400)
        throw new Error('Task not found.')
    }

    //get user before calling findByIdAndUpdate below
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the user that created the task we're updating matches the logged-in user
    if (task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('User not authorized')
    }

    //update task via findByUpdate
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTask)
})

//descr: Delete task
//route: DELETE /api/tasks/:id
//access: Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        res.status(400)
        throw new Error('Task not found.')
    }
    //get user before sending req to delete task below
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the user that created the task matches the logged-in user
    //task has a user field on it, the value of that field is an object _id, so convert toString to compare
    if (task.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('User not authorized')
    }

    await task.deleteOne()

    res.status(200).json({ id: req.params.id })
    //tried changing above as frontend delete functionality is not working... seems it may be due to 'not being to access action.payload.id in taskSlice .addCase(deleteTask.fulfilled)...., as I beleive that is the return from the controller fucntion... so trying to respond with the following instead to grant that access:
    //res.status(200).json({ message: `Task ${req.params.id} deleted` })
    //above did not work, trying this:
    //return res.status(200).json({ id: req.params.id });
    //above did not work, leaving first standard line. 
})


module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
}


