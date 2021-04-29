import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
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
import CodenamesLogo from './codenames-logo.jpg'
import CatanLogo from './Catan.png'
import JKLMLogo from './JKLM.png'
import SecretHitlerLogo from './Secret-Hitler.png'
import SkribblioLogo from './Skribblio.gif'
import SurvivioLogo from './Survivio.png'

const GameRoom = props => {
  const { x, back } = props
  const [direction, setDirection] = useState('')
  const [game, setGame] = useState('')
  const [link, setLink] = useState('')
  const [priv, setPriv] = useState(false)
  const [numPlayers, setNumPlayers] = useState(0)
  const [playerLimit, setPlayerLimit] = useState(0)
  const [owner, setOwner] = useState('')
  const [user, setUser] = useState('')
  const [load, setLoad] = useState('true')
  let pic = ''
  let privt = ''

 


  useEffect(() => {
    const intervalID = setInterval(async () => {

      const { data } = await axios.post('http://localhost:3000/api/lobby', {
        x
      })

      
      // const res = await axios.post(
      //   'http://localhost:3000/api/lobbies/isauthenticated'
      // )
      // setUser(res.data.user)
      // setOwner(res.data.user)
      setGame(data.game)
      setOwner(data.owner)
      setLink(data.link)
      setPriv(data.priv)
      setNumPlayers(data.players.length)
      setPlayerLimit(data.playerLimit)
      setLoad(false)

    }, 2000)
    return () => clearInterval(intervalID)
  }, [owner, user, game, link, priv, numPlayers, playerLimit])
  const  leaveRoom = async () => {
    await axios.post('http://localhost:3000/api/leave', {
          x,
        });
  }

  
  if (priv) {
    privt = 'Private'
  }
  if (game === 'Secret Hitler') {
    pic = SecretHitlerLogo
  } else if (game === 'Codenames') {
    pic = CodenamesLogo
  } else if (game === 'Catan') {
    pic = CatanLogo
  } else if (game === 'JKLM') {
    pic = JKLMLogo
  } else if (game === 'Skribblio') {
    pic = SkribblioLogo
  } else if (game === 'Survivio') {
    pic = SurvivioLogo
  }
  //   if (oddEven % 2 === 0) {
  //     setDirection('right')
  //   } else {
  //     setDirection('left')

  //   }
  if(load) {
    return <p>LOADING</p>
  } 
  return (
      <div>
      <img src={pic} alt="logo" style={{ width: '30%', marginLeft: '35%' }} />
      <h1>{numPlayers} / {playerLimit} players are here</h1>
      <button onClick ={back}>Browse Lobbies</button>
      <button onClick ={() => {leaveRoom(); back()}}>Leave Room-</button>

    </div>
    
  )
}

export default GameRoom
