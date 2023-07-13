//Here we define the schema (fields for this resource - in this case a text field etc.)
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //this type will be the _id of the user Data object (every new resource we create via mongoose has it)
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

module.exports = mongoose.model('Task', taskSchema)