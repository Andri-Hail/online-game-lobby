import React, { useEffect, useState } from 'react'
import 'react-loadingmask/dist/react-loadingmask.css'
import axios from 'axios'
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

import './App.css'
import Login from './Login'
import CodenamesLogo from './codenames-logo.jpg'
import CatanLogo from './Catan.png'
import JKLMLogo from './JKLM.png'
import SecretHitlerLogo from './Secret-Hitler.png'
import SkribblioLogo from './Skribblio.gif'
import SurvivioLogo from './Survivio.png'
import loading from './loading2.gif'
import NavBar from './NavBar'
const About = props => {
  return (
    <div>
      <NavBar />

      <h1 style={{ textAlign: 'center' }}>Our Games:</h1>

      <div style={{ width: '80%', marginLeft: '15%' }}>
        <img
          src={CodenamesLogo}
          style={{ marginLeft: '5%', display: 'inline-block' }}
          width="15%"
          border="1px"
        />
        <p
          style={{
            marginLeft: '5%',
            display: 'inline-block',
            width: '50%',
            marginTop: '10%',
            padding: '5px',
            fontSize: '15px',
          }}
        >
          Codenames is a 2015 card game for 4–8 players designed by Vlaada
          Chvátil and published by Czech Games Edition. Two teams compete by
          each having a "spymaster" give one-word clues that can point to
          multiple words on the board. (yes the link is horsepaste.com!)
          <br></br>
          <Nav.Link
            style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px' }}
            href="https://www.horsepaste.com/"
            target="_blank"
          >
            https://www.horsepaste.com/
          </Nav.Link>
        </p>
      </div>

      <br></br>
      <hr style={{ width: '70%', marginLeft: '15%', marginTop: '15px' }}></hr>

      <div style={{ width: '80%', marginLeft: '15%' }}>
        <p
          style={{
            marginLeft: '5%',
            display: 'inline-block',
            width: '50%',
            marginTop: '10%',
            padding: '5px',
            fontSize: '15px',
          }}
        >
          BombParty is an explosive, fast-paced word game. Players are given a
          phrase (ie. 'ing'), and are tasked with finding a word that contains
          that phrase in time. Watch out! Don't let the bomb explode on you!
        </p>

        <img
          src={JKLMLogo}
          style={{ marginLeft: '5%', display: 'inline-block' }}
          width="15%"
          border="1px"
        />
        <Nav.Link
          style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px' }}
          href="https://jklm.fun/"
          target="_blank"
        >
          https://jklm.fun/
        </Nav.Link>
      </div>

      <br></br>
      <hr style={{ width: '70%', marginLeft: '15%', marginTop: '15px' }}></hr>

      <div style={{ width: '80%', marginLeft: '15%' }}>
        <img
          src={SurvivioLogo}
          style={{ marginLeft: '5%', display: 'inline-block' }}
          width="15%"
          border="1px"
        />
        <p
          style={{
            marginLeft: '5%',
            display: 'inline-block',
            width: '50%',
            marginTop: '10%',
            padding: '5px',
            fontSize: '15px',
          }}
        >
          Surviv.io is a browser based multiplayer online 2D battle royale game.
          Rounds are quick and and the game is easy to get into.
          <br></br>
          <Nav.Link
            style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px' }}
            href="https://surviv.io/"
            target="_blank"
          >
            https://surviv.io/
          </Nav.Link>
        </p>
      </div>

      <br></br>
      <hr style={{ width: '70%', marginLeft: '15%', marginTop: '15px' }}></hr>
      <div style={{ width: '80%', marginLeft: '15%' }}>
        <p
          style={{
            marginLeft: '5%',
            display: 'inline-block',
            width: '50%',
            marginTop: '10%',
            padding: '5px',
            fontSize: '15px',
          }}
        >
          Catan is a multiplayer board game all about building a civilization.
          Throughout the game you will be bartering with other players in an
          attempt to put yourself in a position to win.
        </p>

        <img
          src={CatanLogo}
          style={{ marginLeft: '5%', display: 'inline-block' }}
          width="15%"
          border="1px"
        />
        <Nav.Link
          style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px' }}
          href="https://colonist.io/"
          target="_blank"
        >
          https://colonist.io/
        </Nav.Link>
      </div>

      <br></br>
      <hr style={{ width: '70%', marginLeft: '15%', marginTop: '15px' }}></hr>

      <div style={{ width: '80%', marginLeft: '15%' }}>
        <img
          src={SkribblioLogo}
          style={{ marginLeft: '5%', display: 'inline-block' }}
          width="15%"
          border="1px"
        />
        <p
          style={{
            marginLeft: '5%',
            display: 'inline-block',
            width: '50%',
            marginTop: '10%',
            padding: '5px',
            fontSize: '15px',
          }}
        >
          Skribbl.io is a drawing party game. There are multiple rounds where
          you are given a prompt that you must draw. Then, depending on how fast
          and how many people guess it right you and the correct players are
          rewarded points.
          <br></br>
          <Nav.Link
            style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px' }}
            href="https://skribbl.io/"
            target="_blank"
          >
            https://skribbl.io/{' '}
          </Nav.Link>
        </p>
      </div>

      <br></br>
      <hr style={{ width: '70%', marginLeft: '15%', marginTop: '15px' }}></hr>
      <div style={{ width: '80%', marginLeft: '15%' }}>
        <p
          style={{
            marginLeft: '5%',
            display: 'inline-block',
            width: '50%',
            marginTop: '10%',
            padding: '5px',
            fontSize: '15px',
          }}
        >
          Secret Hitler is a hidden identity social deduction party game. There are fascist players, liberal players, and one hidden hitler. The goal of the liberals is to kill hitler while enacting liberal policies. Fascists, on the other hand, need to protect hitler, while secretly enacting fascist policies.  
        </p>

        <img
          src={SecretHitlerLogo}
          style={{ marginLeft: '5%', display: 'inline-block' }}
          width="15%"
          border="1px"
        />
        <Nav.Link
          style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px' }}
          href="https://secrethitler.io/"
          target="_blank"
        >
          https://secrethitler.io/
        </Nav.Link>
      </div>
    
    
    </div>
  )
}

export default About
