const express = require('express')
const User = require('../models/user')

const router = express.Router()
router.post('/success', (req, res) => {
  console.log('here')

  const { displayName } = req.body

  console.log(displayName)
  try {
    User.findOne({ username: displayName }, (err2, user) => {
      if (user) {
        req.session.username = displayName
        res.send('logged in')
      } else {
        User.create({ username:displayName, password: '12j9-qwdnasip-j2'})
        req.session.username = displayName
        res.send('Successfully made an account!')
      }
    })
  } catch {
    res.send("Couldn't sign you up")
  }
  
  
  
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    User.findOne({ username, password }, (err, user) => {
      if (user) {
        req.session.username = username
        res.send('logged in')
      } else {
        res.send('Username and password do not match an account')
      }
    })
  } catch {
    res.send("Couldn't log you in")
  }
})

router.post('/logout', async (req, res) => {
  req.session = null
  res.send('user logged out')
})

router.post('/signup', async (req, res, err) => {
  const { username, password } = req.body
  try {
    User.findOne({ username }, (err2, user) => {
      if (user) {
        res.send('username taken')
      } else {
        User.create({ username, password })
        req.session.username = username
        res.send('Successfully made an account!')
      }
    })
  } catch {
    res.send("Couldn't sign you up")
  }
})

module.exports = router
