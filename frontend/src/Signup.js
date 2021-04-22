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
import Login from './Login'
// import logo from './logo.png'

const Signup = () => {
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
  const signup = async () => {
    const { data } = await axios.post('/account/signup', {
      username,
      password,
    })
    if (data === 'Successfully made an account!') {
      setMsg('success!')
      history.push('/login')
      login()
    } else {
      setMsg('failed!')
      alert('Someone already has that account name!')
    }
  }

  return (
    <div className="login">
      {/* <img src={logo} alt="logo" /> */}

      <br />
      <br />
      <h3>Sign up</h3>
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
        onClick={() => signup(username, password)}
      >
        Register
      </button>
      <br />
      <br />

      <p>{msg}</p>
      <Link to="/login">login instead</Link>
      <Route path="/login">
        <Login />
      </Route>
    </div>
  )
}

export default Signup
