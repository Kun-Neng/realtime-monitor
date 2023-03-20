const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 3000 });

const numDevices = 2000;
const interval = 100;
let intervalId;
let level = 50;

wsServer.on('connection', (socket) => {
  console.log('connected');

  if (!intervalId) {
    intervalId = setInterval(() => {
      const devices = Array.from(Array(numDevices)).map((_, index) => {
        return {
          name: `device_${index}`,
          value1: Math.ceil(Math.random() * 50) + level,
          value2: Math.ceil(Math.random() * 50) + level,
          value3: Math.ceil(Math.random() * 50) + level,
          status: Math.random() >= 0.8
        };
      });

      wsServer.clients.forEach(client => {
        if (/*client !== socket && */client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(devices));
        }
      });
    }, interval);
  }

  socket.on('close', () => {
    console.log('closed');
    // clearInterval(intervalId);
  });

  socket.on('message', (msg) => {
    const msgObj = JSON.parse(msg.toString());
    const command = typeof msgObj === 'string' ? JSON.parse(msgObj) : msgObj;
    console.log(command);

    if (command.name === 'update') {
      level += command.value;
      if (level >= 255) {
        level = 255;
      }
    }
  });
});
