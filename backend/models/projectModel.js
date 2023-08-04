const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    projectName: {
      type: String,
      required: [true, 'Please add a project name'],
    },
    client: {
      type: String,

    },
    dueDate: {
      type: Date, //actually sent in ISO string format; data's in JSON & there's no JSON Date object
      //is optional on frontend for long-term projects like maintenance; consider changing requiered to false. 
      required: [true, 'Please add a due date'],
    },
    status: {
      type: String,
      //enum is Mongoose validation feature for defining specific string values
      enum: ['In progress', 'Completed', 'Long-Term'],
      default: 'In progress',
    },
  },
  {
    //automatically add createdAt and updatedAt fields with current date and time
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
