const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200'
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

const interval = 1000;
let allowSent = false;
let statusTimer;
let level = 0;

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  if (!statusTimer) {
    statusTimer = setInterval(() => {
      socket.broadcast.emit('status', {
        deviceA: Math.ceil(Math.random() * 10) + level,
        deviceB: Math.ceil(Math.random() * 10) + level,
        deviceC: Math.ceil(Math.random() * 10) + level
      });
    }, interval);
  }

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });

  socket.on('command', (cmd) => {
    if (cmd.name === 'update') {
      level += cmd.value;
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
