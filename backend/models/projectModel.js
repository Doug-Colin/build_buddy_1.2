const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a project title'],
    },
    client: {
      type: String,

    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
    status: {
      type: String,
      //enum is Mongoose validation feature for defining specific string values
      enum: ['In progress', 'Completed'],
      default: 'In progress',
    },
    recurring: {
        type: Boolean,
        default: false
    }

  },
  {
    //automatically add createdAt and updatedAt fields with current date and time
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
