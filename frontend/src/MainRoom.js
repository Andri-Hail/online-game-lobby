import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import { Slider } from 'rsuite'

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
import Lobbies from './Lobbies'

const MainRoom = () => {
  const [disp, setDisp] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [game, setGame] = useState('')
  const [link, setLink] = useState('')
  const [priv, setpriv] = useState(false)
  const [numPlayers, setNumPlayers] = useState(0)
  const [playerLimit, setPlayerLimit] = useState(4)
  const [value, setValue] = useState(0)

  const [owner, setOwner] = useState('')
  const [user, setUser] = useState('')
  const labels = [0,1,2,3,4,5,6,7,8];
    const handleStyle = {
      color: '#fff',
      fontSize: 12,
      width: 32,
      height: 22
    };
  useEffect(() => {
    AOS.init()
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('http://localhost:3000/api/lobbies')
      const res = await axios.post(
        'http://localhost:3000/api/questions/isauthenticated'
      )
      setUser(res.data.user)
      setOwner(res.data.user)
      const dispQs = data.map((q, i) => (
        <Lobbies
          game={q.game}
          owner={q.owner}
          link={q.link}
          numPlayers={q.numPlayers}
          _id={q._id}
          playerLimit={q.playerLimit}
          oddEven={i + 1}
        />
      ))
      setDisp(dispQs)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [owner, user])

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const addLobby = async () => {
    await axios.post('http://localhost:3000/api/lobbies/add', {
      owner,
      game,
      link,
      priv,
      numPlayers,
      playerLimit,
    })
    setIsOpen(false)
  }
  const logout = async () => {
    await axios.post('/account/logout')
  }

  if (user === '' || user === undefined) {
    return (
      <div>
        <Link to="/login">Login here</Link>
        <Route path="/login ">
          <Login />
        </Route>
        <br />

        {disp}
      </div>
    )
  }
  return (
    <div>
      <p>
        Hello &nbsp;
        {user}
        <button
          className="btn btn-danger"
          style={{ float: 'right' }}
          onClick={() => logout(user)}
        >
          Logout
        </button>
      </p>
      <button onClick={showModal}>Start new lobby</button>
      <br />
      <br />

      <Modal animation={false} show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Lobby Set Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <input
            className="addAnswer"
            style={{ width: '90%', borderBottom: '1px solid black' }}
            onChange={e => setGame(e.target.value)}
            placeholder="What game are you playing?"
          /> */}
          <Dropdown>
            <Dropdown.Toggle
              style={{ width: '40%', marginLeft: '30%' }}
              variant="success"
              id="dropdown-basic"
            >
              What game are you playing?
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <input
            className="addAnswer"
            style={{ width: '90%', borderBottom: '1px solid black' }}
            onChange={e => setNumPlayers(e.target.valueAsNumber)}
            placeholder="How many people can play?"
          /> */}

          {/* <div style={{ width: 200, marginLeft: 20 }}>
            <Slider
              min={0}
              max={labels.length - 1}
              value={value}
              className="custom-slider"
              handleStyle={handleStyle}
              graduated
              tooltip={false}
              handleTitle={labels[value]}
              onChange={v => setValue(v)}
            />
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={hideModal}>
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={() => addLobby(game, owner, link, numPlayers, playerLimit)}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
      <br />

      {disp}
    </div>
  )
}

export default MainRoom
