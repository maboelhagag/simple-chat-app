<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCII9Jyj_l1yoq9ZliBbqMVeJRIRQDaRQw",
    authDomain: "simple-chat-19662.firebaseapp.com",
    databaseURL: "https://simple-chat-19662-default-rtdb.firebaseio.com",
    projectId: "simple-chat-19662",
    storageBucket: "simple-chat-19662.appspot.com",
    messagingSenderId: "452631612399",
    appId: "1:452631612399:web:514884f2f8c1c75c1e441a",
    measurementId: "G-GYQY6WRY31"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to handle login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulate authentication using Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Authentication successful
            document.getElementById("message").textContent = "Access granted";
        })
        .catch((error) => {
            // Authentication failed
            document.getElementById("message").textContent = "Access denied";
        });
}
