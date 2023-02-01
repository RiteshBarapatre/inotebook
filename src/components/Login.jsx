import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login(props) {

  const [credentials, setCredentials] = useState({
    email : "",
    password : ""
  })

  let navigate = useNavigate()
  const changed = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  const handleClick = async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method : 'POST',
      headers : {
        'Content-Type' : "application/json",
      },
      body : JSON.stringify({email : credentials.email , password : credentials.password})
    })
    const json = await response.json()
    console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      navigate("/")
      props.alertboot('LOGIN SUCCESSFUL' , "success")
    }else{
      props.alertboot('Please Enter Valid Credentials' , "danger")
    }
  }
  
  
  
  return (
    <div className="container">
    <h2 className='mb-3'>Log In to Continue to iNoteBook</h2>
    <form onSubmit={handleClick}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={changed}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name='password' onChange={changed}/>
    </div>
    <button type="submit" className="btn btn-primary" disabled={credentials.email.length<1 || credentials.password.length<1}>Log In</button>
    <p className='my-3'>Don't have an account ?? <br /><Link to="/signup" onClick={()=>{props.alertboot('Redirected to Sign Up page','warning')}}>Create one</Link></p>
  </form>
  </div>
  )
}

export default Login