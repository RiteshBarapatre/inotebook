const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

//Mongo Uri - Uniform resource identifier
const mongoURI = "mongodb://127.0.0.1:27017/MERN"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection Successful...")
    })
}

//Exporting thr module
module.exports = connectToMongo