<?php
$chatFile = "chat.txt";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nickname = $_POST["nickname"];
    $message = $_POST["message"];

    // Append the new message to the chat file
    file_put_contents($chatFile, "<strong>" . $nickname . "</strong>: " . $message . "<br>", FILE_APPEND);
} elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Read the chat file and send its contents as the response
    echo file_get_contents($chatFile);
}
?>
