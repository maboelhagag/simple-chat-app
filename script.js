// script.js
document.addEventListener('DOMContentLoaded', () => {
  const socket = io(); // Connect to the server

  const chatMessages = document.getElementById('chat-messages');
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');

  // Add a new message to the chat interface
  function addNewMessage(message) {
    const newMessageElement = document.createElement('div');
    newMessageElement.innerText = message;
    chatMessages.appendChild(newMessageElement);
  }

  // Send a new message to the server
  function sendMessage(e) {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('chatMessage', message);
    messageInput.value = '';
  }

  // Receive new message from the server
  socket.on('message', (message) => {
    addNewMessage(message);
  });

  // Event listener for the message form submission
  messageForm.addEventListener('submit', sendMessage);
});
