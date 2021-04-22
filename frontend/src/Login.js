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

    if (data === 'logged in') {
      history.push('/')
    } else {
      alert('wrong username or password!')
    }
  }
  return (
    <div className="login">
      {/* <img src={logo} alt="logo" /> */}
      <br />
      <br />
      <h3>Log in</h3>
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
        className="btn btn-success"
        onClick={() => login(username, password)}
      >
        Login
      </button>
      <br />
      <br />

      <p>{msg}</p>
      <Link to="/signup">sign up instead</Link>
      <Route path="/signup">
        <Signup />
      </Route>
    </div>
  )
}

export default Login
