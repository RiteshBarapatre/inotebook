const mongoose = require('mongoose')

//In models we set the schema of a database here we creating a collection 
const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    password:{
        type : String,
        require : true,
        
    },
    date:{
        type : Date,
        default : Date.now
    }
})

//Creating collenction user in the database MERN 
const User = mongoose.model('user',UserSchema)

//This createIndex is used to avoid the duplication of a data
// User.createIndexes()

module.exports = User