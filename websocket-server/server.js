const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 3000 });

const numDevices = 1000;
const interval = 1000;
let statusTimer = undefined;
let level = 0;

wsServer.on('connection', (socket) => {
  console.log('connected');

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

      wsServer.clients.forEach(client => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(devices));
        }
      });
    }, interval);
  }

  socket.on('close', () => {
    console.log('closed');
  });

  socket.on('message', (msg) => {
    const command = JSON.parse(msg);
    console.log(command);

    if (command.name === 'update') {
      level += command.value;
    }
  });
});
