const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Lobby = require('../models/Lobby')
const User = require('../models/user')

const router = express.Router()

router.post('/lobby', async (req, res) => {
  const { x } = req.body
  Lobby.findById(x).then(lobby => {
    res.send(lobby)
  })
})

router.post('/join', async (req, res) => {
  const { x } = req.body
  try {
    await Lobby.findOneAndUpdate({  _id: x }, { $inc: { numPlayers: 1 } }, { $new: true})
    .lean().exec(function (err, data) {
 });
  } catch {
    console.log('err')
    res.send('could not join lobby')
  }
  try {
    await Lobby.findOneAndUpdate(
      { _id: x },
      { $push: { players: req.session.username } }
    )
  } catch {
    res.send('could not join lobby')
  }
  try {
    await User.findOneAndUpdate(
      { username: req.session.username },
      { inGame: true }
    )
  } catch {
    res.send('could not update user')
  }
  
})

router.post('/leave', async (req, res) => {
  const { x } = req.body
  
  try {
    await Lobby.findOneAndUpdate(
      { _id: x },
      { $pull: { players: req.session.username } }
    )
  } catch {
    res.send('could not join lobby')
  }
  try {
    await User.findOneAndUpdate(
      { username: req.session.username },
      { inGame: false }
    )
  } catch {
    res.send('could not update user')
  }
  
})

router.get('/lobbies', async (req, res) => {
  Lobby.find({}).then(lobby => {
    res.send(lobby)
  })
})

router.post('/lobbies/add', isAuthenticated, async (req, res) => {
  const {x, name, owner, game, link, private, numPlayers, priv, playerLimit } = req.body
  let l = []
  l.push(owner)
  try {
    await Lobby.create({
      _id: x,
      name,
      owner,
      game,
      link,
      private,
      numPlayers,
      priv,
      playerLimit,
      players: l
    })
    res.send('Created lobby')
  } catch(err) {
    console.log('failed' + err)
    res.send("Couldn't create a lobby")
  }
  // try {
  //   await Lobby.findOneAndUpdate(
  //     { _id: x },
  //     { $push: { players: req.session.username } }
  //   )
  // } catch {
  //   res.send('could not join lobby')
  // }
  try {
    await User.findOneAndUpdate(
      { username: req.session.username },
      { inGame: true }
    )
  } catch {
    res.send('could not update user')
  }
})

router.post('/lobbies/isauthenticated', async (req, res) => {
  res.json({ user: req.session.username })
})

router.post('/lobbies/isauthenticated2', async (req, res) => {
  try {
    const curr = await User.find({username: req.session.username})
  // console.log(curr[0])
  // console.log(typeof curr)

  res.json({ user: req.session.username, inGame: curr[0].inGame})

  } catch {
    res.send("Couldn't create a lobby")

  }
  })

// router.post('/questions/answer', isAuthenticated, async (req, res) => {
//   const { username } = req.session
//   const { answer, _id } = req.body

//   try {
//     await Question.findOneAndUpdate({ _id }, { answer })
//     res.send('Answer is updated')
//   } catch {
//     res.send('answer could not update')
//   }
// })

module.exports = router
