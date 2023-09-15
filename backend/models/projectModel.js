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
      // Sent from frontend in ISO string format (JSON lacks Date object)
      // Mongoose Date type automatically converts ISO string to MongoDB-compatible date
      type: Date,
      required: [true, 'Please add a due date'], // Optional on frontend for long-term projects like maintenance
    },
    status: {
      type: String,
      enum: ['In progress', 'Completed', 'Long-Term'],
      default: 'In progress',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
