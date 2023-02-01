import React,{useState} from 'react'
import NoteContext from './NoteContext'

const NoteState = (props)=>{
  const host = "http://localhost:8000"

    const InitialNotes = []
        const [note, setNote] = useState(InitialNotes)

        //FetchNote
        const FetchNote = async ()=>{
          const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method : 'GET',
            headers : {
              'Content-Type' : "application/json",
              'auth-token' : localStorage.getItem('token')
            }
          })
          const json =await response.json()
          setNote(json)
        }

        //AddNote
        const AddNote = async (title,description,tag)=>{
          const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
      
          const notes = await response.json();
          setNote(note.concat(notes))
          props.alertboot('Note Added', 'success')
        }
        //DeleteNote
        const DeleteNote = async (id)=>{

          if(window.confirm("Do you want to delete this note ??") === true){
          const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method : 'DELETE',
            headers : {
              'Content-Type' : "application/json",
              'auth-token' : localStorage.getItem('token')
            },
          })
          const json = await response.json()
          setNote(json)
          const deleteNotes = note.filter((note)=>{return note._id !== id})
          setNote(deleteNotes)
        }
        props.alertboot('Note Deleted', 'danger')
        }
        //UpdateNote
        const UpdateNote = async (id,title,description,tag)=>{
          const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
            method : 'PUT',
            headers : {
              'Content-Type' : "application/json",
              'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
          })
          //eslint-disable-next-line
          const json =await response.json()
          
          
          let newNote = JSON.parse(JSON.stringify(note))
          //Logic to edit in client
          for (let index = 0; index < note.length; index++) {
            const element = note[index];
            if(element._id === id){
              newNote[index].title = title
              newNote[index].description = description
              newNote[index].tag = tag
              break
            }
          }
          setNote(newNote)
          props.alertboot('Note Updated', 'warning')
        }
        const [mode, setMode] = useState('light')
        const dark = ()=>{
          console.log(mode.bgcolor)
          if(mode === 'light'){
            setMode('dark')
            document.body.style.backgroundColor = '#181818'
            document.body.style.color = 'white'
            props.alertboot('Dark Mode Enabled','primary')
          }else{
            setMode('light')
            document.body.style.backgroundColor = '#8899A6'
            document.body.style.color = 'black'
            props.alertboot('Light Mode Enabled','primary')
          }
        }
    return (
        <NoteContext.Provider value={{note, setNote ,AddNote,DeleteNote,UpdateNote,FetchNote,dark,mode}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
