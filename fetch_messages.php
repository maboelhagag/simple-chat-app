<?php

// For simplicity, messages are stored in a file
// In a real-world scenario, you would use a database

$messagesFile = 'messages.json';

if (file_exists($messagesFile)) {
    $messages = json_decode(file_get_contents($messagesFile), true);
    echo json_encode(['messages' => $messages]);
} else {
    echo json_encode(['messages' => []]);
}
