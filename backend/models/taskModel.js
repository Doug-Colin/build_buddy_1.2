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
    },
    status: {
      type: String,
      enum: ["Todo" , "In Progress" , "Done" , "Paused" , "Canceled"],
      default: 'Todo',
    },
    priority: {
        type: String,
        enum: ["Low" , "Medium" , "High" , "Urgent"],
        default: 'Low',
      },
  },
  {
    //automatically add createdAt and updatedAt fields with current date and time
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
