import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import googleSignIn from './googleSignin.png'
import GameBoxLogo from './GameBoxLogo.png'

// import logo from './logo.png'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const login = async () => {
    const { data } = await axios.post('/account/login', {
      username,
      password,
    })

    const { data2 } = await axios.post('/good')
    
    if (data === 'logged in') {
      history.push('/')
    } else {
      alert('wrong username or password!')
    }
  }
  return (
    <div className="login">
      <img src={GameBoxLogo} style={{width:'30%', marginLeft:'auto'}} alt="logo" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <input
        onChange={e => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <br />
      <input
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <br />
      <br />
      <button
        className= "btn btn-outline-success"
        onClick={() => login(username, password)}
      >
        Login
      </button>
      <br />
      <br />
      <a href='/google' />
      <Route path='/google' component={() => { 
     window.location.href = 'http://localhost:3000/google'; 
     return null;
}}/>
      <Link to="/google"><img src={googleSignIn} width='150px' alt ='google sign in'></img></Link>
      <p>{msg}</p>
      <Link to="/signup">sign up instead</Link>
      <Route path="/signup">
        <Signup />
      </Route>
    </div>
  )
}

export default Login
