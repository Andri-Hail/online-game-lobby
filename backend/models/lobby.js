const { Schema, model } = require('mongoose')

const lobbySchema = new Schema ({
    owner: String,
    game: String,
    link: String,
    priv: { type: Boolean, default: false },
    numPlayers: { type: Number, default: 0 },
    playerLimit: { type: Number, default: 4 },
})

module.exports = model('Lobby', lobbySchema)