import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Lobbies from './Lobbies'
import MainRoom from './MainRoom'

const App = () => (
  <div>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="api/lobbies">
        <Lobbies />
      </Route>
      <Route path="/">
        <MainRoom />
      </Route>
    </Switch>
  </div>
)

export default App
