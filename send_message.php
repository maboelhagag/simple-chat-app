<?php

// For simplicity, messages are stored in a file
// In a real-world scenario, you would use a database

$messagesFile = 'messages.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    if ($message !== '') {
        $newMessage = [
            'username' => 'user', // You can replace this with the actual username or user ID
            'message' => $message,
        ];

        $messages = file_exists($messagesFile) ? json_decode(file_get_contents($messagesFile), true) : [];
        $messages[] = $newMessage;

        file_put_contents($messagesFile, json_encode($messages));

        echo json_encode(['success' => true]);
        exit;
    }
}

echo json_encode(['success' => false]);
