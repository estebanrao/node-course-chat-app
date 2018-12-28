const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('.//utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createEmail', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');
    });

    socket.on('createLocationMessage', cords => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', cords.latitude, cords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app,
};
