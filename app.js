d_messagedocument.addEventListener("DOMContentLoaded", function() {
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");
    var chatMessages = document.getElementById("chat-messages");

    // Generate a random nickname for the user
    var nickname = "User" + Math.floor(Math.random() * 10000);

    sendButton.addEventListener("click", function() {
        var message = messageInput.value;

        if (message.trim() !== "") {
            // Send the message to the server
            sendMessage(nickname, message);
            messageInput.value = "";
        }
    });

    function sendMessage(nickname, message) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "send_message.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Refresh the chat messages
                refreshChat();
            }
        };
        xhr.send("nickname=" + encodeURIComponent(nickname) + "&message=" + encodeURIComponent(message));
    }

    function refreshChat() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "send_message.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                chatMessages.innerHTML = xhr.responseText;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        };
        xhr.send();
    }

    // Refresh the chat messages every 2 seconds
    setInterval(refreshChat, 2000);

    // Initial chat refresh
    refreshChat();
});
