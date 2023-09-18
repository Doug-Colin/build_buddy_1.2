const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const User = require('../models/userModel');

// descr: Get note | route: GET /api/notes | access: Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.status(200).json(notes);
});

// descr: Set note | route: POST /api/note | access: Private
const setNote = asyncHandler(async (req, res) => {
  console.log('Received payload:', req.body);

  if (!req.body.noteContent) {
    res.status(400);
    throw new Error('Please add note content');
  }

  const note = await Note.create({
    user: req.user._id,
    noteTitle: req.body.noteTitle,
    noteContent: req.body.noteContent,
    noteLabel: req.body.label || 'General', //use value from request or default
    projectId: req.body.projectId,
    taskId: req.body.taskId,
    client: req.body.client,
  });

  res.status(200).json(note);
});

// descr: Update note | route: PUT /api/notes/:id | access: Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found.');
  }

  // Auth- user check
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Auth- check if user that created note being updated matches logged-in user
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // update note via mongoosefindByIdAndUpdate method
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } //tell Mongoose to return the document
  );

  res.status(200).json(updatedNote);
});

// descr: Delete note | route: DELETE /api/notes/:id | access: Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found.');
  }

  // Auth- user check
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Auth- check if user that created note being deleted matches logged-in user
  // Value of note.user is _id, which is an object; convert toString to compare
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // if (note._id instanceof mongoose.Types.ObjectId) {
  //   console.log('note._id is an instance of mongoose.Types.ObjectId!!!');
  // }

  await note.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
};
