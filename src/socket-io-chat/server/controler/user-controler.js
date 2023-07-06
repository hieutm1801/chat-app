const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports.checkUserExists = async (req, res, next) => {
    try {
        // const { emailReq } = req.params.email
        const user = await User.find({ email: req.params.email }).select([
            "email"
        ])
        return res.json({ status: true, user})
    } catch (ex) {
        next(ex)
    }
}

module.exports.addUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({
            username,
            email
        })
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email"
        ]);
        return res.json(users)
    } catch (ex) {
        next(ex)
    }
}
