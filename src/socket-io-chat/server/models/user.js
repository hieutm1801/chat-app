const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    }
})

module.exports = mongoose.model("User", UserSchema)