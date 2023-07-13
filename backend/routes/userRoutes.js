//three routes here: register/create user, login, and get user info
const express = require ('express')
const router = express.Router()
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

//router for post/create request to add a user
router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/current-user', protect, getCurrentUser)

module.exports = router
