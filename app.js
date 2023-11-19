// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh75rx12k6LNfg5zQ4zJPzIifSCoNMQA4",
  authDomain: "chatroom-73ec1.firebaseapp.com",
  projectId: "chatroom-73ec1",
  storageBucket: "chatroom-73ec1.appspot.com",
  messagingSenderId: "525676968778",
  appId: "1:525676968778:web:f5859440ae9844a8f61fb3",
  measurementId: "G-GMYW7VKZYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = firebase.database();
const chatBox = document.getElementById('chat-box');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = messageInput.value.trim();

    if (message !== '') {
        sendMessage(message);
    }

    messageInput.value = '';
});

function appendMessage(username, text) {
    chatBox.innerHTML += `<p><strong>${username}:</strong> ${text}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function sendMessage(text) {
    const username = prompt("Enter your username:");
    const message = { username, text };

    database.ref('messages').push(message);
}

// Listen for new messages in real-time
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    appendMessage(message.username, message.text);
});
