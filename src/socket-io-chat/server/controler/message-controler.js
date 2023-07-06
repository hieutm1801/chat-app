const Message = require('../models/message')

module.exports.sendMsg = async (req, res, next) => {
    try {
        const { room, author, message, time } = req.body;
        const sendMessage = await Message.create({
            room,
            author,
            message,
            time
        })
        return res.json({ status: true, sendMessage })
    } catch (err) {
        next(err)
    }
}

module.exports.receiveMsg = async (req, res, next) => {
    try {
        const receiveMessage = await Message.find({}).select([
            "room",
            "author",
            "message",
            "time"
        ])

        return res.json({ status: true, receiveMessage })
    } catch (err) {
        next(err)
    }
}