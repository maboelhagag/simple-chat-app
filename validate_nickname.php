<?php
$chatFile = "chat.txt";
$userListFile = "user_list.txt";

$action = $_GET["action"];

if ($action === "check-nickname") {
    $nickname = $_GET["nickname"];
    $available = checkNicknameAvailability($nickname);
    echo json_encode(["available" => $available]);
} elseif ($action === "save-nickname") {
    $nickname = $_GET["nickname"];
    saveNickname($nickname);
} elseif ($action === "send-message") {
    $message = $_GET["message"];
    saveMessage($message);
} elseif ($action === "refresh-chat") {
    echo getChatLog();
}

function checkNicknameAvailability($nickname) {
    $log = file_get_contents($userListFile);
    $logArray = explode("\n", $log);

    foreach ($logArray as $entry) {
        $entryParts = explode(",", $entry);
        if (count($entryParts) >= 2) {
            $savedNickname = $entryParts[0];
            if ($savedNickname === $nickname) {
                return false;
            }
        }
    }

    return true;
}

function saveNickname($nickname) {
    $ip = $_SERVER["REMOTE_ADDR"];
    $logEntry = $nickname . "," . $ip . "\n";
    file_put_contents($userListFile, $logEntry, FILE_APPEND);
}

function saveMessage($message) {
    $nickname = $_GET["nickname"];
    $logEntry = $nickname . ": " . $message . "<br>";
    file_put_contents($chatFile, $logEntry, FILE_APPEND);
}

function getChatLog() {
    return file_get_contents($chatFile);
}
?>
