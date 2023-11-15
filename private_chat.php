<?php
// private_chat.php

$privateChatFile = "private_chat.txt";
$action = $_GET["action"];

if ($action === "send-private-message") {
    $message = $_GET["message"];
    savePrivateMessage($message);
} elseif ($action === "refresh-private-chat") {
    echo getPrivateChatLog();
}

function savePrivateMessage($message) {
    $targetUser = $_GET["targetUser"];
    $nickname = $_GET["nickname"];
    $logEntry = $targetUser . ":" . $nickname . ": " . $message . "<br>";
    file_put_contents($privateChatFile, $logEntry, FILE_APPEND);
}

function getPrivateChatLog() {
    return file_get_contents($privateChatFile);
}
?>
