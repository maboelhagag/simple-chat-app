const socket = new WebSocket('ws://your-backend-server-url'); // Replace with your server URL

socket.addEventListener('message', (event) => {
    const messageBox = document.getElementById('chat-box');
    const message = JSON.parse(event.data);
    messageBox.innerHTML += `<p><strong>${message.username}:</strong> ${message.text}</p>`;
});

document.getElementById('message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username-input').value;
    const text = document.getElementById('message-input').value;

    const message = { username, text };
    socket.send(JSON.stringify(message));

    document.getElementById('message-input').value = '';
});
