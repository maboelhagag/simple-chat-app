const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const nicknameInput = document.getElementById('nickname');

// Generate a random unique nickname if user doesn't provide one
let nickname = generateNickname();

// Check if user has entered a nickname
if (nicknameInput.value.trim()) {
  nickname = nicknameInput.value.trim();
}

// Update user's nickname
document.getElementById('nickname').value = nickname;

// Function to generate a random unique nickname
function generateNickname() {
  const adjectives = ['Awesome', 'Brilliant', 'Creative', 'Dynamic', 'Energetic', 'Fantastic', 'Gifted', 'Happy', 'Intelligent', 'Jolly'];
  const nouns = ['Artist', 'Builder', 'Coder', 'Dancer', 'Explorer', 'Friend', 'Gamer', 'Hero', 'Inventor', 'Joker'];

  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

// Connect to the WebSocket server
const socket = new WebSocket('https://maboelhagag.github.io/simple-chat-app/');

// Handle incoming messages
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const message = `${data.username}: ${data.message}`;

  messages.innerHTML += `<div class="message">${message}</div>`;
};

// Handle message submission
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageForm.elements.message.value.trim();

  if (!message) {
    return;
  }

  socket.send(JSON.stringify({
    username: nickname,
    message: message
  }));

  messageForm.elements.message.value = '';
});
