import React, { useEffect, useState } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import GameBoxLogo from './GameBoxLogo.png'


import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

import './App.css'
import Login from './Login'
import GameRoom from './GameRoom'

import Lobbies from './Lobbies'

const NavBar = () => {
  const logout = async () => {
    await axios.post('/account/logout')
  }

    return (
  

<nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/home">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
            </li>
           
        </ul>
    </div>
    <div class="mx-auto order-0">
    {/* <img src={GameBoxLogo} style={{width:'0%', marginLeft:'auto'}} alt="logo" /> */}

        <h1 style = {{fontSize: '40px' }} class="navbar-brand mx-auto" href="#">Game Box</h1>

    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
           
            <li class="nav-item">

               <button
                className="btn btn-outline-danger"
                style={{ float: 'right' }}
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
        </ul>
    </div>
</nav>)
}
export default NavBar
