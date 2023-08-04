//Here we define the schema (fields for this resource - in this case a text field etc.)
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        /*
        Add User model's _id here to associate task with user.
        In Mongoose, when you want to create a relationship between two collections (in this case, Task an User), you use the ObjectId type and the ref option. The ObjectID type represents the unique _id in each document, and the ref options tells Mongoose which model (or other collection) to use when populating this field. So ref: 'User' tells Mongoose that the ObjectId in the user field refers to a document in the User model, whicih doesn't need to imported in this model as its registered with Mongoose globally upon export.   
        */
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: 'User'
        },
        text: {
        type: String,
        required: [true, 'Please add a text value'],
        }
    }, 
    {
        timestamps: true,
    }
)

//Exoport the Task model and register it with Mongoose globally. 
module.exports = mongoose.model('Task', taskSchema)