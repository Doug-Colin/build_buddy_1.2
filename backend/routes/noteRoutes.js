const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

//protected & combined route for get and post requests (create/read)
router.route('/').get(protect, getNotes).post(protect, createNote);

//protected & combined route for put and delete requests (update/delete)
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
