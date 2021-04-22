const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Lobby = require('../models/Lobby')

const router = express.Router()

router.get('/lobbies', async (req, res) => {
  Lobby.find({}).then(lobby => {
    res.send(lobby)
  })
})


router.post('/lobbies/add', isAuthenticated, async (req, res) => {
  const { name, game, link, private, numPlayers } = req.body
  try {
    await Lobby.create({ name, game, link, private, numPlayers })
    res.send('Created lobby')
  } catch {
    res.send("Couldn't create a lobby")
  }
})

router.post('/questions/isauthenticated', async (req, res) => {
  res.json({ user: req.session.username })
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


