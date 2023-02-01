const express = require("express");
//Importing the user collection from MERN database
const User = require("../models/User");

//Setting the router in express
const router = express.Router();

//Validator for express 
const { body, validationResult } = require("express-validator");

//Converting the password into hash by using the bcrypt module
const bcrypt = require("bcryptjs");
//Returning a token to the user for ease authentication
const jwt = require('jsonwebtoken')

//Decalring the token
const JSON_WEB_TOKEN = "riteshisagood@$boy"

//Importing fetch user from middleware
const fetchuser = require('../middleware/fetchuser')

//ROUTE 1 : Setting routes inside the localhost:8000/api/auth
router.post(
  //Setting createuser route
  "/createuser",
  //Validating the name, email and password
  [
    //in boody we pass 2 argument that is element to validate and the error msg
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  //Making async callback funtion just like we create in the app.get
  async (req, res) => {
    let success = false
    //Validating the result and storing the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false
      //If error comes then set status code 400 and return the json 
      return res.status(400).json({success, errors: errors.array() });
    }
    //Searching for the email in the collection named users
    let user = await User.findOne({ email: req.body.email });

    //If user found then do the below statement 
    if (user) {
      success = false
      return res
        .status(400)
        .json({success, errors: "User with this email already exist !!!" });
    }

    //Salt is the addded string to the hash of the password to make it more secure
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password,salt)

    //Creating the document in the users collection
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      //This secpass is the hash converted password
      password: secpass,
    });
    // res.json(user);

    const data = {
      user:{
        id : user.id
      }
    }

    //Returning a jwt token
    const jwtData = jwt.sign(data,JSON_WEB_TOKEN)
    success = true
    res.json({success, "authtoken" : jwtData})
  }
);

//ROUTE 2 : Authenticating a user using POST "/api/auth/login". No login required
router.post('/login',
[
  body('email','Enter a valid email').isEmail(),
  body('password','Password can not be blanked').exists(),
],async (req,res)=>{
  let success = false
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //If error comes then set status code 400 and return the json 
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body
    try {
      let user = await User.findOne({email})
      if(!user){
        success = false
        return res.status(400).json({success, errors: "Please try to login with correct credentials"})
      }

      const passwordCompare =await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        return res.status(400).json({ errors: "Please try to login with correct credentials"})
      }
      const data = {
        user:{
          id : user.id
        }
      }
  
      //Returning a jwt token
      //In jwt token we have the id of the object where the users information is stored is stored inside the token 
      const jwtData = jwt.sign(data,JSON_WEB_TOKEN)
      success = true
      res.json({success, "authtoken" : jwtData})
    } catch (error) {
      success = false
      res.json({success, "error" : "Something is Wrong "})
    }
})


//ROUTE 3 : Get logged in user details using POST "/api/auth/login". No login required
//Here we are creating a middleware named fetchuser .
//What is middleware :- A middleware is a function which is called when any request is made by the user
// It is set as the second argument after the path
// This middleware function is written in the middleware folder

//Here we are using the middleware for extracting the id from the jwt token
router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    let userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    res.send(error)
  }})
 

module.exports = router;
