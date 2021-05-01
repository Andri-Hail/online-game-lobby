const { Schema, model } = require('mongoose')

const lobbySchema = new Schema ({
    _id: String,
    owner: String,
    game: String,
    link: String,
    priv: { type: Boolean, default: false },
    numPlayers: { type: Number, default: 0 },
    playerLimit: { type: Number, default: 0 },
    pic: String,
    players: [{type: String}],
    password: String

});

module.exports = model('Lobby', lobbySchema)