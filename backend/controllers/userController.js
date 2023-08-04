const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//descr: Register new user
//route/endpoint: POST /api/users
//access: Public
const registerUser = asyncHandler(async (req, res) => {  //mongoose and bcrypt both use async methods so make async
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    //check if user exists
    const userExists = await User.findOne({ email })

    //if so, throw error
    if(userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    //hash password with bcrypt dependency (generate a salt to hash the pw by calling bcrypt method genSalt())
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    //create User
    //ES6 shorthand property names for when property and value are identical (equivalent to name: name)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
      })

    
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//descr: Authenticate a user
//route: POST /api/users/login
//access: Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email (25:16 -check server and postman when wifi is back)
    const user = await User.findOne({ email })

        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials.')
        }                            
})


//descr: Get user data
//route: GET /api/users/current-user
//access: Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })

// Generate JWT, pass 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {  //pass the id in as the payload for our json web token
      expiresIn: '30d',
    })
  }

module.exports = { 
    registerUser,
    loginUser,
    getCurrentUser,
    generateToken,
 }