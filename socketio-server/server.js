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

const numDevices = 1000;
const interval = 1000;
let statusTimer;
let level = 0;

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  if (!statusTimer) {
    statusTimer = setInterval(() => {
      const devices = Array.from(Array(numDevices)).map((_, index) => {
        return {
          name: `device_${index}`,
          value1: Math.ceil(Math.random() * 10) + level,
          value2: Math.ceil(Math.random() * 10) + level,
          value3: Math.ceil(Math.random() * 10) + level,
          status: Math.random() >= 0.8
        };
      });

      socket.broadcast.emit('devices', devices);
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
