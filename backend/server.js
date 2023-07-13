const express = require('express')
// const colors = require('colors')
// const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5050

connectDB()

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler) //overwrite default express error handler

app.listen(port, () => console.log(`Server started on port ${port}`))

