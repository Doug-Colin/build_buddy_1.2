const express = require('express');
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

//protected & combined route for get and post requests (create/read)
router.route('/').get(protect, getTasks).post(protect, setTask);

//protected & combined route for put and delete requests (update/delete)
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
