document.addEventListener("DOMContentLoaded", function () {
    const nicknameModal = document.getElementById("nickname-modal");
    const nicknameInput = document.getElementById("nicknameInput");
    const nicknameErrorMessage = document.getElementById("nicknameErrorMessage");
    const userListComponent = document.getElementById("user-list-content");
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");

    let nickname;

    // Open the nickname modal on page load
    openNicknameModal();

    // Function to open the nickname modal
    function openNicknameModal() {
        nicknameModal.style.display = "block";
    }

    // Function to close the nickname modal
    function closeNicknameModal() {
        nicknameModal.style.display = "none";
    }

    // Function to set the nickname
    window.setNickname = function () {
        const suggestedNickname = generateSuggestedNickname();
        const enteredNickname = nicknameInput.value.trim();

        if (enteredNickname === "" || !isValidNickname(enteredNickname)) {
            nicknameErrorMessage.textContent = "Invalid nickname. Please enter a valid nickname.";
        } else {
            nicknameErrorMessage.textContent = "";
            nickname = enteredNickname;
            closeNicknameModal();
            initChat();
        }
    };

    // Function to generate a suggested nickname
    function generateSuggestedNickname() {
        // Generate a random 8-character alphanumeric nickname
        return Math.random().toString(36).substring(2, 10);
    }

    // Function to check if a nickname is valid
    function isValidNickname(nickname) {
        // Check if the nickname is not in chat.txt
        // (This is a simplified check for demonstration purposes)
        return true;
    }

    // Function to initialize the chat
    function initChat() {
        // Update the user list
        updateUserList();

        // Simulate receiving a welcome message
        appendMessage("System", "Welcome to the chat!");

        // Simulate receiving a user joined message
        appendMessage("System", `${nickname} joined the chat!`);
    }

    // Function to update the user list
    function updateUserList() {
        // Add the current user to the list
        const userItem = document.createElement("li");
        userItem.textContent = nickname;
        userListComponent.appendChild(userItem);

        
        });
    }

    // Function to send a message
    window.sendMessage = function () {
        const message = messageInput.value.trim();
        if (message !== "") {
            // Simulate sending a message
            appendMessage(nickname, message);
            messageInput.value = "";
        }
    };

    // Function to append a message to the chat window
    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
    }

    // Simulate receiving a message
    setInterval(() => {
        const senders = ["User1", "User2", "User3"];
        const sender = senders[Math.floor(Math.random() * senders.length)];
        const message = "This is a sample message.";
        appendMessage(sender, message);
    }, 5000); // Simulate a new message every 5 seconds
});
