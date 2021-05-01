import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Input, Whisper, Tooltip } from 'rsuite'

// import Dropdown from 'react-bootstrap/Dropdown'
import { CheckPicker, Slider, TreePicker } from 'rsuite'
import { Dropdown } from 'rsuite'
import { Checkbox } from 'rsuite'
import CodenamesLogo from './codenames-logo.jpg'
import CatanLogo from './Catan.png'
import JKLMLogo from './JKLM.png'
import SecretHitlerLogo from './Secret-Hitler.png'
import SkribblioLogo from './Skribblio.gif'
import SurvivioLogo from './Survivio.png'
import 'rsuite/dist/styles/rsuite-default.min.css'
import loading from './loading2.gif'

import 'bootstrap/dist/css/bootstrap.min.css'

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
import GameRoom from './GameRoom'
import NavBar from './NavBar'

import Lobbies from './Lobbies'

const MainRoom = () => {
  const [disp, setDisp] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [game, setGame] = useState('')
  const [link, setLink] = useState('')
  const [priv, setPriv] = useState(false)
  const [numPlayers, setNumPlayers] = useState(0)
  const [playerLimit, setPlayerLimit] = useState(2)
  const [pic, setPic] = useState('')
  const [inGame, setInGame] = useState(false)
  const [load, setLoad] = useState(true)

  // const [canCreate, setCanCreate] = useState(false)

  const [id, setId] = useState('')
  const [_id, set_Id] = useState('')

  const [joined, setJoined] = useState(false)
  const [owner, setOwner] = useState('')
  const [user, setUser] = useState('')
  const enterGame = async x => {
    set_Id(x)
    setId(x)
    // console.log('id: ' + id)
    // console.log('_id: ' + _id)

    const { data } = await axios.post('http://localhost:3000/api/lobby', {
      x,
    })
    console.log(data)
    if (joined && data.players.includes(user)) {
      setInGame(true)
    } else {
      if (data.playerLimit != data.numPlayers && !joined) {
        setInGame(true)
      }
      if (!data.players.includes(user) && !joined) {
        await axios.post('http://localhost:3000/api/join', {
          x,
        })
      }
    }
  }
  // console.log(joined)
  useEffect(() => {
    AOS.init()
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('http://localhost:3000/api/lobbies')
      const res = await axios.post(
        'http://localhost:3000/api/lobbies/isauthenticated2'
      )
      setUser(res.data.user)
      setOwner(res.data.user)
      setJoined(res.data.inGame)

      // set_Id(res.data.user + Math.random() * 100)
      // setOwner(res.data.user)

      const dispQs = data.map((q, i) => (
        <Lobbies
          game={q.game}
          owner={q.owner}
          link={q.link}
          numPlayers={q.players.length}
          _id={q._id}
          players={q.players}
          key={q._id}
          playerLimit={q.playerLimit}
          oddEven={i + 1}
          pic={q.pic}
          priv={q.priv}
          func={enterGame}
        />
      ))
      setDisp(dispQs)
    }, 1000)
    return () => clearInterval(intervalID)
  }, [owner, user, joined])

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const addLobby = async x => {
    await axios.post('http://localhost:3000/api/lobbies/add', {
      x,
      owner,
      game,
      link,
      priv,
      numPlayers,
      playerLimit,
      priv,
      pic,
    })
    enterGame(x)
    setInGame(true)

    setIsOpen(false)
  }
  const logout = async () => {
    await axios.post('/account/logout')
  }
  if (user === '' || user === undefined) {
    setTimeout(function () {
      setLoad(false)
    }, 1500)
    return (
      <div>
        {!load && <Login />}
        {load && (
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
        )}
        <br />
      </div>
    )
  }
  if (inGame) {
    return <GameRoom x={_id} user={user} back={() => setInGame(false)} />
  } else {
    return (
      <div style={{ width: '100%' }}>
  
<NavBar />
    
        {!joined && <button onClick={showModal}>Start new lobby</button>}
        <br />
        <br />

        <p>Hello {user}!</p>


        <Modal
          animation={false}
          show={isOpen}
          onHide={() => {
            hideModal()
            setPlayerLimit(0)
            setGame('')
            setPriv(false)
          }}
          style={{ alignText: 'center' }}
        >
          <Modal.Header>
            <Modal.Title>Lobby Set Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropdown
              title="Select a game"
              style={{ width: '40%', marginLeft: '35%' }}
            >
              <Dropdown.Item
                onSelect={() => {
                  setGame('Secret Hitler')
                  setPic(SecretHitlerLogo)
                }}
              >
                Secret Hitler
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  setGame('JKLM')
                  setPic(JKLMLogo)
                }}
              >
                JKLM
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  setGame('Codenames')
                  setPic(CodenamesLogo)
                }}
              >
                Codenames
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  setGame('Catan')
                  setPic(CatanLogo)
                }}
              >
                Catan
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  setGame('Survivio')
                  setPic(SurvivioLogo)
                }}
              >
                Survivio
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  setGame('Skribblio')
                  setPic(SkribblioLogo)
                }}
              >
                Skribblio
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setGame('Custom')}>
                Custom
              </Dropdown.Item>
            </Dropdown>

            {/* <input
              className="addAnswer"
              style={{ width: '90%', borderBottom: '1px solid black' }}
              onChange={e => setLink(e.target.value)}
              placeholder="What's the link to your game lobby?"
            /> */}

            <div style={{ textAlign: 'center' }}>
              <br />
              <br />
              <h4>How many players?</h4>
              <Slider
                graduated
                progress
                onChange={value => {
                  setPlayerLimit(value)
                }}
                min ={2}
                max={10}
                style={{ margin: '10px', width: '50%', marginLeft: '25%' }}
              />
              <h4>{playerLimit}</h4>
            </div>

            <br />

            <div style={{ marginLeft: '40%' }}>
              <Checkbox
                onChange={() => {
                  setPriv(!priv)
                }}
              >
                {' '}
                Private Room?
              </Checkbox>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => {
                hideModal()
                setPlayerLimit(0)
                setGame('')
                setPriv(false)
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                console.log(user)
                let x = user
                console.log('x before addlobby:' + x)
                // set_Id(user);
                // console.log(_id)
                addLobby(x)
              }}
            >
              Create
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          animation={false}
          show={isOpen}
          onHide={hideModal}
          style={{ marginTop: '20%', alignText: 'center' }}
        >
          <Modal.Header>
            <Modal.Title>Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Lobbies
              game={game}
              owner={user}
              // link={q.link}
              // numPlayers={numPlayers}
              // _id={q._id}
              playerLimit={playerLimit}
              oddEven={-1}
              pic={pic}
              priv={priv}
            />
          </Modal.Body>
        </Modal>
        <br />

        {disp}
      </div>
    )
  }
}

export default MainRoom
