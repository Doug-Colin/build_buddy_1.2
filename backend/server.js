const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');
const port = process.env.PORT || 3150;

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// Overwrite default express error handler
app.use(errorHandler);

/*
 Code for serving the frontend directly from the backend in production mode.
 - Use if hosting frontend and backend together.
 - Ensure frontend is built and the path (../frontend/build or (../frontend/dist) matches the location of built files.
 - For separate hosting of frontend and backend, this code can be ignored.
 - Adjust paths for tool used in frontend build (this case Vite).
*/

/* -------------- Faulty code for production mode ----------------
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
*/

// Serve static files in production.
if (process.env.NODE_ENV === 'production') {

// Define path to the frontend build directory
const pathToFrontend = path.resolve(__dirname, '../frontend/dist');

  app.use(express.static(pathToFrontend));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(pathToFrontend, 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

//Listens on all available IP addresses if deployed ('0.0.0.0' - necesessary for cloud deployment)
app.listen(port, '0.0.0.0', () =>
  console.log(`Server started on port ${port}`)
);
