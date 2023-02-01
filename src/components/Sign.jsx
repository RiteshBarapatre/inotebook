import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Sign(props) {
  const [credentials, setCredentials] = useState({
    name : "",
    email : "",
    password : "",
    cpassword : ""
  })

  let navigate = useNavigate()
  const changed = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  
  const handleClick = async (e)=>{
    e.preventDefault()
    if(credentials.cpassword === credentials.password){
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method : 'POST',
      headers : {
        'Content-Type' : "application/json",
      },
      body : JSON.stringify({name : credentials.name, email : credentials.email , password : credentials.password})
    })
    const json = await response.json()
    console.log(json)
      localStorage.setItem('token',json.authtoken)
      navigate("/")
      props.alertboot('Welcome... Sign Up Successful' , "success")
    }else{
      props.alertboot('Please Confirm Password Correctly' , "danger")
  }
  }
  
  
  return (
    <div className="container">
    <h2 className='mb-3'>Create an account to use iNoteBook</h2>
    <form onSubmit={handleClick}>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name" onChange={changed} required />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={changed} required/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name='password' onChange={changed} required minLength="4"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={changed} required minLength="4"/>
    </div>
    <button type="submit" className="btn btn-primary">Sign Up</button>
    <p className='my-3'>Already have an account ?? <br /><Link to="/login" onClick={()=>{props.alertboot('Redirected to Login page','warning')}}>Log In</Link></p>
  </form>
  </div>
  )
}

export default Sign