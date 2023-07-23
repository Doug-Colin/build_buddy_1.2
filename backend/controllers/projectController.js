//install & initialize express-async-handler middleware package to catch errors automatically and handle  them via errorMiddleware.js (instead of try-catch)
const asyncHandler = require("express-async-handler") 

const Project = require('../models/projectModel')
const User = require('../models/userModel')

//descr: Get project
//route: GET /api/projects
//access: Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ user: req.user.id })

    res.status(200).json(projects)
})


/*
descr: Set project
route: POST /api/projects
access: Private
When an error occurs within this async route:
1. The error is caught by express-async-handler.
2. Express automatically passes the caught error to the next middleware in line, which in this case is the errorHandler middleware from errorMiddleware.js.
3. errorHandler formats the error as JSON, ensuring a consistent error response to the frontend.
4. This approach replaces Express' default HTML error page with a more informative JSON error message.
*/
const setProject = asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400)
      throw new Error('Please add a project title')
    }
  
    const project = await Project.create({
      user: req.user.user._id,
      title: req.body.title,
      client: req.body.client,
      dueDate: req.body.dueDate,
      status: req.body.status || 'In progress', //use value from request or default
      recurring: req.body.recurring || false    //use value from request or default
    })
  
    res.status(200).json(project)
  })

//descr: Update project
//route: PUT /api/projects/:id
//access: Private
const updateProject = asyncHandler(async (req, res) => {
    //get project by id in url
    const project = await Project.findById(req.params.id) 

    //check for project
    if (!project) {
        res.status(400)
        throw new Error('Project not found.')
    }

    //get user before calling updating project via findByIdAndUpdate
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Authorization- check user that created project being updated against logged-in user
    if (project.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('User not authorized')
    }

    //update project via mongoose's findByIdAndUpdate
    //findByIdAndUpdate takes three args, the ID of the doc to update, the update operations, and options that affect the query. {new: true} option tells Mongoose to return the doc.  
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedProject)
})

//descr: Delete project
//route: DELETE /api/projects/:id
//access: Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        res.status(400)
        throw new Error('Project not found.')
    }
    //get user before sending req to delete project below
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the user that created the project matches the logged-in user
    //project has a user field on it, the value of that field is an object _id, so convert toString to compare
    if (project.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('User not authorized')
    }

    await project.deleteOne()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getProjects,
    setProject,
    updateProject,
    deleteProject,
}


