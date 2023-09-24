const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    noteTitle: {
        type: String,
        required: true
    },
    noteContent: {
        type: Object,
        // required: true *note necessary for creation of note, only adding noteContent
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    noteLabel: {
      type: String,
      enum: ['Project', 'Task', 'Client', 'General'],
      default: 'General',
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);