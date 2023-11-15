<?php
// private_chat.php

$targetUser = $_GET["targetUser"];

if (empty($targetUser)) {
    die("Invalid target user.");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Private Chat</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div id="private-chat-container">
        <h1>Private Chat with <?php echo $targetUser; ?></h1>
        <div id="private-chat-messages"></div>
        <input type="text" id="private-message-input" placeholder="Type your message...">
        <button id="private-send-button">Send</button>
    </div>

    <script src="private_chat.js"></script>
</body>
</html>
