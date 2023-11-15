<?php

$nickname = isset($_POST['nickname']) ? trim($_POST['nickname']) : '';

// Validate the nickname (simplified check for demonstration purposes)
if (isValidNickname($nickname)) {
    // Append the nickname to chat.txt (simplified file appending for demonstration purposes)
    file_put_contents('chat.txt', "$nickname," . $_SERVER['REMOTE_ADDR'] . PHP_EOL, FILE_APPEND);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid nickname. Please choose another.']);
}

function isValidNickname($nickname) {
    // Check if the nickname is not in chat.txt (simplified check for demonstration purposes)
    return true;
}
?>
