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
import CodenamesLogo from './codenames-logo.jpg'
import CatanLogo from './Catan.png'
import JKLMLogo from './JKLM.png'
import SecretHitlerLogo from './Secret-Hitler.png'
import SkribblioLogo from './Skribblio.gif'
import SurvivioLogo from './Survivio.png'

const Lobbies = props => {
  const { owner, link, numPlayers, players, playerLimit, game, priv, oddEven, func, _id } = props
  const [direction, setDirection] = useState('')
  const [joined, setJoined] = useState('')

  let pic = ''
  let privt = ''
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

  useEffect(async () => {
    AOS.init({
      duration: 2000,
    })
    const res = await axios.post(
        'http://localhost:3000/api/lobbies/isauthenticated2'
      )
     
      setJoined(res.data.inGame)
      if(players.includes(res.data.user)) {
          setJoined(false)
      }
  }, [])

  if (pic === '') {
    return <h3 style={{ textAlign: 'center' }}>Choose a game first!</h3>
  }
  if (oddEven === -1) {
    return (
      <div className="lobby">
        <h4>
        {owner}'s {privt} <span style={{ color: 'blue' }}> {game}</span> Lobby
        </h4>
        <img src={pic} alt="logo" style={{ width: '20%' }} />
        <br></br>
        <button className="join">Join</button>
        <p>
          There's{' '}
          <span style={{ color: 'blue' }}>
            {' '}
            {numPlayers} / {playerLimit}
          </span>{' '}
          people here so far
        </p>
      </div>
    )
  }
  return (
    <div>
      <div data-aos={'fade-' + direction} className={'lobby'}>
        <h4>
        {owner}'s  {privt} <span style={{ color: 'blue' }}> {game}</span> Lobby
        </h4>
        <img src={pic} alt="logo" style={{ width: '20%' }} />
        <br></br>
        {!joined &&  players.length != playerLimit&& <button className="join" disabled={joined || players.length === playerLimit} onClick = {() => func(owner)}>Join</button>}
        {(joined || players.length === playerLimit) && <button className="join" style={{backgroundColor:'#f06654'}} disabled={joined || players.length === playerLimit} onClick = {() => func(owner)}>Join</button>}

        <p>
          There's{' '}
          <span style={{ color: 'blue' }}>
            {' '}
            {numPlayers} / {playerLimit}{' '}
          </span>{' '}
          people here so far
        </p>
      </div>
    </div>
  )
}

export default Lobbies
