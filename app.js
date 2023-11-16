// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

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
