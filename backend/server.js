const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.port || 5050;

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

app.listen(port, () => console.log(`Server started on port ${port}`));

// Code for serving the frontend directly from the backend in production mode.
// - Use if hosting frontend and backend together.
// - Ensure frontend is built and the path (../frontend/build) matches the location of built files.
// - For separate hosting of frontend and backend, this code can be ignored.
// - Adjust paths if using a tool other than Create React App for frontend build.

/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
*/
