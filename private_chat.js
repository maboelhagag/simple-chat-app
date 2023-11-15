document.addEventListener("DOMContentLoaded", function() {
    var privateChatMessages = document.getElementById("private-chat-messages");
    var privateMessageInput = document.getElementById("private-message-input");
    var privateSendButton = document.getElementById("private-send-button");

    // Event listener for sending a private message
    privateSendButton.addEventListener("click", function() {
        var message = privateMessageInput.value;

        if (message.trim() !== "") {
            sendPrivateMessage(message);
            privateMessageInput.value = "";
        }
    });

    function sendPrivateMessage(message) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "private_chat.php?action=send-private-message&message=" + encodeURIComponent(message), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                refreshPrivateChat();
            }
        };
        xhr.send();
    }

    function refreshPrivateChat() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "private_chat.php?action=refresh-private-chat", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                privateChatMessages.innerHTML = xhr.responseText;
                privateChatMessages.scrollTop = privateChatMessages.scrollHeight;
            }
        };
        xhr.send();
    }

    // Refresh the private chat messages every 2 seconds
    setInterval(refreshPrivateChat, 2000);

    // Initial private chat refresh
    refreshPrivateChat();
});
