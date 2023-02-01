import React,{useState,useContext} from 'react'
import NoteContext from "../context/notes/NoteContext";

export default function AddNote() {
    const context = useContext(NoteContext)
    //eslint-disable-next-line
    const {AddNote} = context

    const [addNote, setAddNote] = useState({
        title : "",
        description : "",
        tag : ""
    })

    const handleClick = (e)=>{
        e.preventDefault()
        AddNote(addNote.title,addNote.description,addNote.tag)
        setAddNote({
          title : "",
          description : "",
          tag : ""
        })
    }
    const Changed = (e)=>{
        setAddNote({...addNote, [e.target.name] : e.target.value})
    }
    
  return (
    <div className="container my-3">
    <h2>Add a Note :</h2>
    <form>
      <div className="mb-3">
        <label className="form-label">
          Title :
        </label>
        <input
        type="text"
          className="form-control"
          id="title"
          name='title' 
          onChange={Changed}
          value={addNote.title}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Tag :
        </label>
        <input
        type="text"
          className="form-control"
          id="tag"
          name='tag' 
          onChange={Changed}
          value={addNote.tag}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">        
          Description : 
        </label>  
        <textarea 
          type="password"
          className="form-control"
          id="description"
          name='description' 
          rows="6"
          style={{resize : "none"}}
          onChange={Changed}
          value={addNote.description}
        />
      </div>
      <button disabled={addNote.title<3 || addNote.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
    </div>
  )
}
