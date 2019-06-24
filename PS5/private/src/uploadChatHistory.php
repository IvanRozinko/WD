<?php
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}
date_default_timezone_set('Europe/Kiev');
$path = '../msg/history.json';

if (!file_exists($path)) {
    fopen($path, 'w');
    exit();
}

/*
get last time of changing file and if its differs from time saved in SESSION -> read all messages from file and
send last hour messages to chat.php
*/
if ($_SESSION['chat_modified_time'] == ($chat_modified_time = filemtime($path))) {
    echo '';
    exit();
}

$msg_full_history = json_decode(file_get_contents($path));
if (empty($msg_full_history)) {
    echo '';
    exit();
}

//filter array with file content to get only last hour messages
$msg_last_hour = array_filter($msg_full_history, 'getLastHourMsg');
$_SESSION['chat_modified_time'] = $chat_modified_time;
//send to user site last hour messages
echo json_encode($msg_last_hour);


/**
 * Filtering history.json content and returning messages sent not earlier than 1 hour ago
 * @param $msg - message from database
 * @return bool is it was sent earlier than 1 hour ago
 */
function getLastHourMsg($msg)
{
    $sec_per_hour = 3600;
    $time_from = time() - $sec_per_hour;
    $msg_time = strtotime($msg->date . $msg->time);
    return $msg_time > $time_from;
}
