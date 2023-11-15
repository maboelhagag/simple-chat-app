document.addEventListener("DOMContentLoaded", function() {
    var nicknameInput = document.getElementById("nickname-input");
    var nicknameSubmit = document.getElementById("nickname-submit");
    var nicknameError = document.getElementById("nickname-error");
    var userList = document.getElementById("user-list");
    var chatRoom = document.getElementById("chat-room");
    var messages = document.getElementById("messages");
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");

    // Prompt the user for a nickname
    nicknameInput.focus();

    // Event listener for nickname submission
    nicknameSubmit.addEventListener("click", function() {
        var nickname = nicknameInput.value.trim();

        if (validateNickname(nickname)) {
            // Check if the nickname is available
            checkNicknameAvailability(nickname);
        }
    });

    // Event listener for sending a message
    sendButton.addEventListener("click", function() {
        var message = messageInput.value;

        if (message.trim() !== "") {
            sendMessage(message);
            messageInput.value = "";
        }
    });

    // Event listener for double-clicking on a user in the user list
    userList.addEventListener("dblclick", function(event) {
        var target = event.target;

        if (target.tagName.toLowerCase() === "li" && target.textContent !== nicknameInput.value) {
            openPrivateChat(target.textContent);
        }
    });

    function validateNickname(nickname) {
        // Regex pattern for validating the nickname
        var pattern = /^[a-zA-Z][a-zA-Z0-9]{0,7}$/;

        if (!pattern.test(nickname)) {
            nicknameError.textContent = "Nickname is invalid. It should be 1-8 alphanumeric characters and not start with a number.";
            return false;
        }

        return true;
    }

    function checkNicknameAvailability(nickname) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "chat.php?action=check-nickname&nickname=" + encodeURIComponent(nickname), true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                if (response.available) {
                    // Save the nickname and join the chat room
                    saveNickname(nickname);
                    joinChatRoom();
                } else {
                    nicknameError.textContent = "The nickname is not available. Please choose another one.";
                }
            }
        };
        xhr.send();
    }

    function saveNickname(nickname) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "chat.php?action=save-nickname&nickname=" + encodeURIComponent(nickname), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                nicknameInput.disabled = true;
                nicknameSubmit.disabled = true;
            }
        };
        xhr.send();
    }

    function joinChatRoom() {
        nicknameInput.style.display = "none";
        nicknameSubmit.style.display = "none";
        nicknameError.style.display = "none";
        chatRoom.style.display = "block";
        messageInput.focus();
    }

    function sendMessage(message) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "chat.php?action=send-message&message=" + encodeURIComponent(message), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                refreshChat();
            }
        };
        xhr.send();
    }

    function refreshChat() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "chat.php?action=refresh-chat", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                messages.innerHTML = xhr.responseText;
                messages.scrollTop = messages.scrollHeight;
            }
        };
        xhr.send();
    }

    function openPrivateChat(targetUser) {
        // Open a new tab or window for the private chat
        window.open("private_chat.php?targetUser=" + encodeURIComponent(targetUser), "_blank");
    }

    // Refresh the chat messages every 2 seconds
    setInterval(refreshChat, 2000);

    // Initial chat refresh
    refreshChat();
});
