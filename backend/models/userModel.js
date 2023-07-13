const mongoose = require('mongoose')


//be sure to add admin role to userSchema later
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

//export this model, pass in the name of the model and the relevant Schema 
module.exports = mongoose.model('User', userSchema)