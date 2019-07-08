<?php
include_once('config.php');
include_once ('getLastHourMsg.php');
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}


if (!file_exists(CHAT_HISTORY)) {
    fopen(CHAT_HISTORY, 'w');
    exit('');
}

/*
get last time of changing file and if its differs from time saved in SESSION -> read all messages from file and
send last hour messages to chat.php
*/
if ($_SESSION['chat_modified_time'] == ($chat_modified_time = filemtime(CHAT_HISTORY))) {
    exit('');
}

$msg_full_history = json_decode(file_get_contents(CHAT_HISTORY));
if (empty($msg_full_history)) {
    exit('');
}

//filter array with file content to get only last hour messages
$msg_last_hour = array_filter($msg_full_history, 'getLastHourMsg');
$_SESSION['chat_modified_time'] = $chat_modified_time;
//send to user site last hour messages
echo json_encode($msg_last_hour);



