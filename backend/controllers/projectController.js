const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
const User = require('../models/userModel');

// descr: Get project | route: GET /api/projects | access: Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });

  res.status(200).json(projects);
});

// descr: Set project | route: POST /api/project | access: Private
const setProject = asyncHandler(async (req, res) => {
  console.log('Received payload:', req.body);

  if (!req.body.projectName) {
    res.status(400);
    throw new Error('Please add a project name');
  }

  const project = await Project.create({
    user: req.user._id,
    projectName: req.body.projectName,
    client: req.body.client,
    dueDate: req.body.dueDate,
    status: req.body.status || 'In progress', //use value from request or default
  });

  res.status(200).json(project);
});

// descr: Update project | route: PUT /api/projects/:id | access: Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found.');
  }

  // Auth- user check
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Auth- check if user that created project being updated matches logged-in user
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // update project via mongoosefindByIdAndUpdate method
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } //tell Mongoose to return the document
  );

  res.status(200).json(updatedProject);
});

// descr: Delete project | route: DELETE /api/projects/:id | access: Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found.');
  }

  // Auth- user check
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Auth- check if user that created project being deleted matches logged-in user
  // Value of project.user is _id (an object); convert toString to compare
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (project._id instanceof mongoose.Types.ObjectId) {
    console.log('project._id is an instance of mongoose.Types.ObjectId!!!');
  }

  await project.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
};
