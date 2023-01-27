//Importing the jwt token
const jwt = require('jsonwebtoken')
const JSON_WEB_TOKEN = "riteshisagood@$boy"

//Creating a middlware function
//What is next :- By using next we can specify which function should be run after completing this function
const fetchuser = (req,res,next)=>{
     const token = req.header('auth-token')
     if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
     }
     try{
        const data = jwt.verify(token, JSON_WEB_TOKEN)
        req.user = data.user
        next()
     }catch (error){
        res.status(401).send({error : "Please authenticate using a valid token"})
     }
}

module.exports = fetchuser