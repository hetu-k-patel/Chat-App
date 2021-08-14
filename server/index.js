import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

import { addUser, removeUser, getUser, getUserInRoom } from './users.js';

const PORT = process.env.PORT || 5000;

import router from './router.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: '*',
   },
});

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
   socket.on('join', ({ name, room }, callback) => {
      const { user, error } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.emit('message', {
         user: 'admin',
         text: `${user.name}, Welcome to the "${user.room}" room!`,
      });

      socket.broadcast
         .to(user.room)
         .emit('message', { user: 'admin', text: `${user.name} has joined!` });

      socket.join(user.room);

      callback();
   });

   socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
   });

   socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
         io.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} has left`,
         });
      }
   });
});

httpServer.listen(PORT, () => console.log(`Server running on ${PORT}`));
