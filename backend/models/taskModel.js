const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    projectName: {
      type: String,
    },
    client: {
      type: String,

    },
    label:{
      type: String,
        enum: ["General" , "Sourcing" , "Fabrication" , "Finishing" , "Shipping" , "Repair" , "Administrative" , "Maintenance"],
        default: 'General',
    },
    taskName: {
        type: String,
        required: [true, 'Please add a task name'],
    },
    taskDescription: {
        type: String,
        required: [true, 'Please add a description of your task'],
    },
    status: {
      type: String,
      enum: ["To Do" , "In Progress" , "Done" , "Paused" , "Canceled"],
      default: "To Do",
    },
    priority: {
        type: String,
        enum: ["Low" , "Medium" , "High" , "Urgent"],
        default: 'Low',
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
