import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { note, FetchNote,UpdateNote, DeleteAllNotes } = context;
  let navigate = useNavigate()
  const [updateNote, setUpdateNote] = useState({
    _id : "",
    title : "",
    description : "",
    tag : ""
})
  useEffect(() => {
    if(localStorage.getItem('token')){
      FetchNote();
    }else{
      props.alertboot('Please Login First','warning')
      navigate('/login')
    }
    
  });

  const ref = useRef(null)

  const updateNotemodal = (currentNote) => { 
    ref.current.click()
    setUpdateNote(currentNote)
  };

  const deleteall = ()=>{
    DeleteAllNotes()
  }

const handleClick = (e)=>{
    e.preventDefault()
    UpdateNote(updateNote._id,updateNote.title,updateNote.description,updateNote.tag)
    console.log(updateNote)
}
const Changed = (e)=>{
    setUpdateNote({...updateNote, [e.target.name] : e.target.value})
}

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">  <form>
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
          value={updateNote.title}
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
          value={updateNote.tag}
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
          value={updateNote.description}
        />
      </div>
    </form>
    </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes : {note.length > 0 && <span><button className="btn btn-danger" onClick={deleteall}>Delete All Notes</button></span>}</h2>
        
        <div className="container">
        {note.length===0 && "No Notes to Display"}
        </div>
        {note.map((elem, index) => {
          return <NoteItems note={elem} key={index} updateNote={updateNotemodal} />;
        })}
      </div>
    </>
  );
}
