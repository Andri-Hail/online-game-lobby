import React, { useEffect, useState } from 'react'
import AOS from 'aos'

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
import logo from './codenames-logo.jpg'

const Lobbies = props => {
  const { owner, link, numPlayers, playerLimit, game, priv, oddEven } = props
  const [direction, setDirection] = useState('right')
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
    if (oddEven % 2 === 0) {
        console.log(oddEven)
        setDirection('left') 
      }
  }, [])

 

  return (
    <div>
      <div data-aos={"fade-"+direction} className={'lobby'+oddEven}>
        <h4>
          Andri's <span style={{ color: 'blue' }}> {game}</span> Lobby
        </h4>
        <img src={logo} alt="logo" style={{ width: '20%' }} />
        <br></br>
        <button className="join">Join</button>
        <p>
          There's <span style={{ color: 'blue' }}> {numPlayers} / {playerLimit} </span> people here so
          far
        </p>
      </div>
    </div>
  )
}

export default Lobbies
