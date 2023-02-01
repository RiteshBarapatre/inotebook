import React,{useContext} from 'react'
import NoteContext from "../context/notes/NoteContext";


export default function NoteItems(props) {
  const context = useContext(NoteContext)
  const {DeleteNote} = context

    const {note, updateNote} = props
    
  return (
    <div className="col-md-3">
    <div className="card my-3">
  <div className="card-body">
  <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
    {note.tag}
  </span>
  <div className="d-flex align-items-center">
  <h5 className="card-title">{note.title}</h5>
  <i className="fa fa-solid fa-trash mx-2" onClick={()=>{DeleteNote(note._id)}}></i>
    <i className="fa fa-solid fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
  </div>
    <p className="card-text">{note.description}</p>
   
  </div>
</div>
</div>
  )
}
