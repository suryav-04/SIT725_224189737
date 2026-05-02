const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // 
    socket.on('join', (name) => {
        socket.username = name;

        io.emit('receiveMessage', {
            type: 'join',
            name: name
        });
    });

    // handle messages
    socket.on('sendMessage', (data) => {
        const messageData = {
            type: 'message',
            name: data.name,
            text: data.text,
            time: new Date().toLocaleTimeString()
        };

        io.emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('receiveMessage', {
                type: 'leave',
                name: socket.username
            });
        }
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
