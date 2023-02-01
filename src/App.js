import React,{useState} from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Alert from './components/Alert';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Sign from "./components/Sign";

function App() {
  const [alert, setAlert] = useState(null);
  const alertMsg = (msg, type) => {
    setAlert({
      message: msg,
      Artype: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState alertboot = {alertMsg}>
        <Navbar alertboot = {alertMsg}/>
        <Alert alert = {alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home alertboot = {alertMsg}/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login alertboot = {alertMsg}/>} />
          <Route path="/signup" element={<Sign alertboot = {alertMsg}/>} />
        </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
