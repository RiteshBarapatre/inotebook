const mongoose = require('mongoose')
//Same as the User model
const NoteSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId
    },
    
    title:{
        type : String,
        require : true
    },
    description:{
        type : String,
        require : true,
    },
    tag:{
        type : String,
        require : true,
        default : "General"
    },
    date:{
        type : Date,
        require : true,
        default : Date.now
    }
})

module.exports = mongoose.model('notes',NoteSchema)