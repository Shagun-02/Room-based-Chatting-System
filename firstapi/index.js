const express = require('express'); // importing express
const api_config = require('./config'); //importing config.js
const cors = require('cors');


//creating server
const app = express();
app.use(cors());
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = api_config.port; //specifying port 

const rooms = [];


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('room_update', rooms);

  socket.on('sendmsg', data => {
    console.log(`message for room ${data.room}`);
    // socket.broadcast.emit('rcvmsg', data);
    socket.to(data.room).emit('rcvmsg', data);
  })


  socket.on('createroom', function (obj) {
    socket.join(obj.room_name);
    rooms.push(obj);

    socket.emit('room_update', rooms);
    socket.broadcast.emit('room_update', rooms);

    console.log(`room created with name ${obj.room_name}`)
  });

  socket.on('joinroom', function (name) {
    socket.join(name);

    console.log(`room joined with name ${name}`)
  });
});

//creating server
http.listen(port, () => {
  console.log('sever started at ' + port);
});



