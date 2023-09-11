const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//Middleware to protect user routes by validating JWT.

const protect = asyncHandler(async (req, res, next) => {
    //initialize token
    let token 

    //Validate authorization header, confirm it starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        try {
            // Extracts the token from Authorization header by separating it from the 'Bearer' prefix.
            token = req.headers.authorization.split(' ')[1] 
            
            //reverse jwt encoding process to access payload(id or user._id)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //Fetch user from DB with id matching one decoded from token
            //Add user property (w/o pw) to req object so it's accessible in subsequent middleware & protected route handlers
            req.user = await User.findById(decoded.id).select('-password')
            
            //Proceed to next middleware
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
        //Handle missing token
        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }   
})

module.exports = { protect }