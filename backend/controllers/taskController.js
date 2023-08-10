const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

//descr: Get tasks
//route: GET /api/taskss
//access: Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json(tasks);
});

//descr: Set task
//route: POST /api/tasks
//access: Private
const setTask = asyncHandler(async (req, res) => {
  console.log('Received payload:', req.body);

  if (!req.body.taskName) {
    res.status(400);
    throw new Error('Please add a task name');
  }

  const task = await Task.create({
    user: req.user._id,
    projectName: req.body.projectName,
    client: req.body.client,
    label: req.body.label || "General",  //use values from request or default
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    status: req.body.status || 'In Progress', 
    priority: req.body.priority || 'Low', 
  });

  res.status(200).json(task);
});

//descr: Update task
//route: PUT /api/tasks/:id
//access: Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found.');
  }

  //get user before calling updateTask
  const user = await User.findById(req.user.id);

  //Auth- user check
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Auth- check logged-in user matches user calling updateTask
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

//descr: Delete task
//route: DELETE /api/tasks/:id
//access: Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found.');
  }
  //get user before sending req to delete
  const user = await User.findById(req.user.id);

  //user check
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Check if user that created the task matches the logged-in user
  //task user property is an object _id; convert toString for comparison
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  console.log('Type of task._id:', typeof task._id);
  console.log('Value of task._id:', task._id);
  if (task._id instanceof mongoose.Types.ObjectId) {
    console.log('task._id is an instance of mongoose.Types.ObjectId!!!');
  }


//   console.log(`attempting to delete task with id of ${task._id}`);
//   console.log('Type of task._id:', typeof task._id);
//   console.log('Value of task._id:', task._id);
  await task.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
