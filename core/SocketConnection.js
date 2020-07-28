const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//----------------------------------------------------helpers----------------------------------------------------------------------//

const { addUser, removeUser, getUser, getUserInRoom } = require('../Helpers/User');

//---------------------------------------------------------------------------------------------------------------------------------//

io.on('connection', socket => {
  console.log('We have a connection');
  socket.on('join', ({ name, room }, callback) => {
    let { user, error } = addUser({ name, room, id: socket.id });
    if (error) {
      return callback(error);
    }
    socket.emit('message', {
      user: 'admin',
      text: `${user.name},Welcome to the room ${user.room}`
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}, User has joined` });
    socket.join(user.room);
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    console.log(message);
    callback();
  });
  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

//------------------------------------------------------Starting Server-------------------------------------------------------------------------//

server.listen(process.env.SOCKET_PORT || 2720, () => {
  console.log(`socket started at ${process.env.SOCKET_PORT}`);
});

//---------------------------------------------------------------------------------------------------------------------------------------------//
