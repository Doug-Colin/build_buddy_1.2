//**************  Middleware (functions that execute during request response cycle)


//middleware to handle errors so Express doesn't send an html doc by default
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)
    
    //respond with json object with two properties; the message from the relevant route handler, and if in development env, send the stack as well  
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler, 
}