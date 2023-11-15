document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Function to append a message to the chat window
    function appendMessage(username, message) {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
    }

    // Event listener for the send button
    sendButton.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message !== "") {
            // You can replace "user" with the actual username or user ID
            appendMessage("user", message);
            messageInput.value = "";
        }
    });

    // You can add WebSocket functionality for real-time chat
    // For simplicity, we'll use a basic PHP backend to handle messages

    // Function to fetch messages from the server
    function fetchMessages() {
        fetch("fetch_messages.php")
            .then(response => response.json())
            .then(data => {
                data.messages.forEach(message => {
                    appendMessage(message.username, message.message);
                });
            });
    }

    // Fetch initial messages
    fetchMessages();

    // Function to send a message to the server
    function sendMessage(message) {
        const formData = new FormData();
        formData.append("message", message);

        fetch("send_message.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    appendMessage("user", message);
                } else {
                    console.error("Failed to send message");
                }
            });
    }

    // You can add more functionality such as user authentication, creating chat rooms, etc.
    // This example is a basic starting point.
});
