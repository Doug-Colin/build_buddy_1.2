const mongoose = require('mongoose');

//troubleshoot connection issues
console.log('Connecting to:', process.env.MONGO_URI.split('@')[1]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1); //tell Node.js to terminate process scynchronously with an exit status code
  }
};

module.exports = connectDB;
