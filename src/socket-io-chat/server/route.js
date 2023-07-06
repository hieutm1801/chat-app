const {
    checkUserExists,
    addUser,
    getAllUsers,
} = require('./controler/user-controler');
const {
    sendMsg,
    receiveMsg
} = require('./controler/message-controler');

const router = require("express").Router();

router.get("/checkUserExists/:email", checkUserExists)
router.post('/addUser', addUser)
router.post('/allusers/:id', getAllUsers)
router.post('/sendMsg', sendMsg)
router.get('/receiveMsg', receiveMsg)

module.exports = router