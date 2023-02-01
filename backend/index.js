const express = require('express')
const cors = require('cors')

//We create and connect the database in the other file and export is as module and here we import that.
const connectToMongo = require('./db')
//Running the imported function
connectToMongo()

//Creating an instance for using the express
const app = express()

//Setting the middleware for json data
app.use(express.json())

//Setting the CORS for express api call through browser
app.use(cors())

//Available Routes 
//Importing the routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

//Listening to port 8000
app.listen(8000,()=>{
    console.log("Listening to port 8000...")
})