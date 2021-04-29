const { Schema, model } = require('mongoose')

const userSchema = new Schema ({
    name: String,
    username: { type: String, required: true},
    inGame: {type: Boolean, default: false},
    password: { type: String, required: true}

})

module.exports = model('User', userSchema)