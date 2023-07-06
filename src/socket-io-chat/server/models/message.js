const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    room: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Message", MessageSchema)