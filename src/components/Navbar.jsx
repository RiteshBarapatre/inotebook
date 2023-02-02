import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

export default function Navbar(props) {
  const context = useContext(NoteContext);
  const { dark,mode } = context;
  let navigate = useNavigate();
  const Logout = () => {
    if (window.confirm("Are you sure that you want to log out ???")) {
      localStorage.removeItem("token");
      navigate("/login");
      props.alertboot("Redirected to Login Page...", "warning");
    }
  };

  let activeStyle = {
    fontSize: "17px",
    borderBottom: "2px solid rgb(5, 121, 203)",
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`} style={{position : 'sticky', top : '0'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          iNoteBook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mt-2 mx-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={dark}
              />
            </div>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Log In{" "}
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                Sign Up
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={Logout}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
