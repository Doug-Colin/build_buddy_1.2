const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//This middleware protects our user routes
const protect = asyncHandler(async (req, res, next) => {
    let token //initialize token

    //check for authorization header and make sure it starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        try {
            //Get token from header & assign to variable
            token = req.headers.authorization.split(' ')[1] //.split this string by spaces into array (Bearer and token separate indices)
            
            //verify token and decode it so we can get the payload (which is the id)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user id from token and assign it to req.user so we can access it in any protected routes
            req.user = await User.findById(decoded.id).select('-password') //.select('-') keeps PW from being returning as well 

            next() //always call next piece of middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
        //if no token, msg 'not authorized'
        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }   
})

module.exports = { protect }