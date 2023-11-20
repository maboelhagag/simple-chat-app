const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
