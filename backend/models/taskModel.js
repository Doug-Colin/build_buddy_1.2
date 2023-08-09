const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    //When connecting to projects collection (add select for projects), may need to be modified
    projectName: {
      type: String,
    },
    client: {
      type: String,

    },
    taskName: {
        type: String,
        required: [true, 'Please add a task name'],
    },
    label:{
        enum: ["General" | "Sourcing" | "Fabrication" | "Finishing" | "Shipping" | "Repair" | "Administrative" | "Maintenance"],
        default: 'General',
    },
    taskDescription: {
        type: String,
    },
    status: {
      type: String,
      enum: ["Todo" | "In Progress" | "Done" | "Paused" | "Canceled"],
      default: 'Todo',
    },
    Priority: {
        type: String,
        enum: ["Low" | "Medium" | "High" | "Urgent"],
        default: 'Low',
      },
  },
  {
    //automatically add createdAt and updatedAt fields with current date and time
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
