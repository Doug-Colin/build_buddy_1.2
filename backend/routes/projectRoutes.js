//note- JS syntax here, syntax will be different for frontend if using Typescript/ts2015
const express = require('express');
const router = express.Router();
const {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');

//protected & combined route for get and post requests (create/read)
router.route('/').get(protect, getProjects).post(protect, setProject);

//protected & combined route for put and delete requests (update/delete)
router.route('/:id').delete(protect, deleteProject).put(protect, updateProject);

module.exports = router;
