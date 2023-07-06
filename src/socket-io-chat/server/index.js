const express = require("express");
const http = require("http");
const path = require('path');
const cors = require("cors");
const mongoose = require('mongoose');
const socket = require("socket.io");
const app = express();
// const server = http.createServer(app);
const router = require('./route')
require('dotenv').config();

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../../build')));
app.use('/api', router)

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfully")
  })
  .catch ((err) => {
    console.log(err.message);
  });


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(3001, () => {
  console.log(`SERVER RUNNING on ${server.address().address} port: ${server.address().port}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.HOST_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

