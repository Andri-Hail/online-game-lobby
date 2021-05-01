import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import { Input, Whisper, Tooltip } from 'rsuite'
import Nav from 'react-bootstrap/Nav'
import CodenamesLogo from './codenames-logo.jpg'
import CatanLogo from './Catan.png'
import JKLMLogo from './JKLM.png'
import SecretHitlerLogo from './Secret-Hitler.png'
import SkribblioLogo from './Skribblio.gif'
import ready from './ready.png'
import NavBar from './NavBar'
import SurvivioLogo from './Survivio.png'
import loading from './loading2.gif'

const GameRoom = props => {
  const { x, back, user } = props
  const [game, setGame] = useState('')
  const [link, setLink] = useState('')
  const [priv, setPriv] = useState(false)
  const [numPlayers, setNumPlayers] = useState(0)
  const [playerLimit, setPlayerLimit] = useState(0)
  const [players, setPlayers] = useState([])
  const [linkAdded, setLinkAdded] = useState(false)
  const [passAdded, setPassAdded] = useState(false)

  const [inputPass, setInputPass] = useState('')
  const [pass, setPass] = useState('')
  const [allowed, setAllowed] = useState(false)

  const [owner, setOwner] = useState('')
  const [load, setLoad] = useState('true')
  let pic = ''
  let privt = ''
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.post('http://localhost:3000/api/lobby', {
        x,
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
      if (!data.priv) {
        setAllowed(true)
      }
      setNumPlayers(data.players.length)
      setPass(data.password)
      setPlayerLimit(data.playerLimit)
      setLoad(false)
      let playerNames = data.players.map((x, i) => (
        <h4 style={{ textAlign: 'center' }}>
          <img src={ready} alt="ready" style={{ width: '25px' }} />{' '}
          <span style={{ fontWeight: 'bold' }}>{x}</span>
        </h4>
      ))
      setPlayers(playerNames)
      if (playerNames.length === playerLimit) {
        alert('Your game is ready!' + { link })
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [owner, user, game, link, priv, numPlayers, playerLimit])
  const leaveRoom = async () => {
    await axios.post('http://localhost:3000/api/leave', {
      x,
    })
  }
  const deleteRoom = async () => {
    await axios.post('http://localhost:3000/api/delete', {
      x,
    })
  }
  const addLink = async x => {
    await axios.post('http://localhost:3000/api/lobbies/addLink', {
      x,
      link,
    })
  }
  const addPass = async x => {
    await axios.post('http://localhost:3000/api/lobbies/addPass', {
      x,
      pass,
    })
  }
  const loginRoom = () => {
    console.log(pass)
    console.log(inputPass)
    if (pass === inputPass) {
      setAllowed(true)
    }
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

  if (load) {
    return (
      <img
        src={loading}
        alt="loading"
        style={{
          width: '200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
          marginTop: '20%',
        }}
      />
    )
  } else if (!allowed && priv && user != owner) {
    return (
      <div style={{ textAlign: 'center' }}>
        <NavBar />
        <br></br>
        <br></br>

        <br></br>

        <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
          <Input
            style={{ width: '20%', marginLeft: '40%' }}
            // placeholder="Whats the password"
            onChange={e => setInputPass(e)}
          />
        </Whisper>
        <button
          onClick={() => {
            loginRoom()
          }}
        >
          Submit
        </button>
      </div>
    )
  } else if (user === owner) {
    return (
      <div>
        <NavBar />
        <img
          src={pic}
          alt="logo"
          style={{ width: '20%', marginLeft: '40%', maxHeight: '30%' }}
        />
        <Nav.Link style={{ textAlign: 'center', fontSize: '25px' }} href={link}>
          {link}
        </Nav.Link>
        <br />
        <br />
        <h1 style={{ textAlign: 'center' }}>
          {numPlayers} / {playerLimit} players are here
        </h1>
        <br />
        <br />
        {players}
        <br />
        <br />
        {!linkAdded && (
          <div style={{ textAlign: 'center' }}>
            <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
              <Input
                style={{ width: '20%', marginLeft: '40%' }}
                placeholder="Add the game link here"
                onChange={e => setLink(e)}
              />
            </Whisper>

            <button
              onClick={() => {
                addLink(user)
                setLinkAdded(true)
              }}
            >
              Set link
            </button>
          </div>
        )}
        {(!passAdded && priv) && (
          <div style={{ textAlign: 'center' }}>
            <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
              <Input
                style={{ width: '20%', marginLeft: '40%' }}
                placeholder="Set the password"
                onChange={e => setPass(e)}
              />
            </Whisper>

            <button
              onClick={() => {
                addPass(user)
                setPassAdded(true)
              }}
            >
              Set Password
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: '4%',
            textAlign: 'center',
            width: '30%',
            marginLeft: '35%',
          }}
        >
          <button
            onClick={back}
            style={{ margin: '5px' }}
            className="btn btn-outline-warning"
          >
            Browse Lobbies
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              leaveRoom(user)
              deleteRoom(user)
              back()
            }}
          >
            Leave Room
          </button>
          <br></br>
          {linkAdded && (
            <button
              onClick={() => {
                setLinkAdded(false)
              }}
            >
              Change link
            </button>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <NavBar />
        <img
          src={pic}
          alt="logo"
          style={{ width: '20%', marginLeft: '40%', maxHeight: '30%' }}
        />
        <Nav.Link style={{ textAlign: 'center', fontSize: '25px' }} href={link}>
          {link}
        </Nav.Link>
        <br />
        <br />
        <h1 style={{ textAlign: 'center' }}>
          {numPlayers} / {playerLimit} players are here
        </h1>
        <br />
        <br />
        {players}
        <br />
        <br />

        <div
          style={{
            marginTop: '4%',
            textAlign: 'center',
            width: '30%',
            marginLeft: '35%',
          }}
        >
          <button
            onClick={back}
            style={{ margin: '5px' }}
            className="btn btn-outline-warning"
          >
            Browse Lobbies
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              leaveRoom(user)
              back()
            }}
          >
            Leave Room
          </button>
          <br></br>
        </div>
      </div>
    )
  }
}

export default GameRoom
