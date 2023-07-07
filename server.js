const path = require('path');
const express = require('express');

const formatMsg = require('./utils/formatMessage');
const http = require('http');

const socketio = require('socket.io');
const { log } = require('console');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


// for static folders
app.use(express.static(__dirname + "/public"));

// when clint connects..
io.on('connection', socket=>{

    socket.emit('message', formatMsg('bot', 'Welcome to chatApp!'));          // Only to user

    //BroadCast when a user connects.   // broadcast to everybody expect user.
    socket.broadcast.emit('message', formatMsg('bot','A user has joined the chat'));

    
    socket.on('chatMessage', msg=>{
        io.emit('message', formatMsg('user', msg));
    });


    // BroadCast message from user.     // broadCast to everybody.
    socket.on('disconnect',() =>{
        io.emit('message', formatMsg('bot', 'User has left the chat.'));
    });
});

const PORT = 3000 || process.env.PORT;


server.listen(PORT, ()=> console.log('Server running on port 3000'));