const socket = io();

let username = "";

// Name
document.getElementById('nameInput').addEventListener('change', () => {
    username = document.getElementById('nameInput').value;

    if (username.trim() !== "") {
        socket.emit('join', username);
    }
});

// send message
function sendMessage() {
    const msg = document.getElementById('msgInput').value;

    if (username.trim() === '' || msg.trim() === '') {
        alert("Enter both name and message");
        return;
    }

    socket.emit('sendMessage', {
        name: username,
        text: msg
    });

    document.getElementById('msgInput').value = '';
}

// receive messages
socket.on('receiveMessage', (data) => {
    const li = document.createElement('li');

    if (data.type === 'join') {
        li.textContent = `🟢 ${data.name} joined`;
    } 
    else if (data.type === 'leave') {
        li.textContent = `🔴 ${data.name} left`;
    } 
    else {
        li.textContent = `${data.name}: ${data.text} (${data.time})`;
    }

    document.getElementById('messages').appendChild(li);
});
