const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Get all the notes using GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.json({"error" : error})
    }
});

//ROUTE 2 : Add a new note using POST "/api/notes/addnotes"
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a Valid Name").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //If error comes then set status code 400 and return the json
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
        res.json({"error" : error})
    }
  }
);


//ROUTE 3 : Update an existing note using POST "/api/notes/updatenotes"
router.put(
  "/updatenotes/:id",
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //Create a new note object
      const newnote = {}
      if(title){newnote.title = title} 
      if(description){newnote.description = description} 
      if(tag){newnote.tag = tag} 


      // find a note to be updated 
      let note =await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}

      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
      }

      note = await Notes.findByIdAndUpdate(req.params.id, {$set : newnote} , {new : true})

      res.json(note);
    } catch (error) {
        res.json({"error" : error})
    }
  }
);


//ROUTE 4 : Deleting existing note using DELETE "/api/notes/deletenotes"
router.delete(
  "/deletenotes/:id",
  fetchuser,
  async (req, res) => {
    try {

      // find a note to be deleted 
      let note = await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}

      //Allow deletion only if the user owns the note
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
      }

      note = await Notes.findByIdAndDelete(req.params.id)

      res.json({"Success" : "Note has been deleted" , note});
    } catch (error) {
        res.json({"error" : error})
    }
  }
);

//Route : 5 --> Deleting All Notes
//Created by Me
router.delete(
  "/deleteallnotes",
  fetchuser,
  async (req, res) => {
    try {
      let note = await Notes.deleteMany({ user: req.user.id })
      res.json({"Success" : "All Notes has been deleted"});
    } catch (error) {
        res.json({"error" : error})
    }
  }
);

module.exports = router;
