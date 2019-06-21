<?php
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: error.php');
}

$_SESSION['file_modified_time'] =
$path = '../msg/history.json';

if (!file_exists($path)) {
    fopen($path, 'w');
    return;
}

/**
 * Filtering history.json content and returning messages sent not earlier than 1 hour ago
 * @param $msg - message from database
 * @return bool is it was sent earlier than 1 hour ago
 */
function getLastHourMsg($msg) {
    $time_from = time() - 3600000;
    $msg_time = strtotime($msg -> date . $msg -> time);
   return $msg_time > $time_from;
}

$msg_full_history = json_decode(file_get_contents($path));
if (empty($msg_full_history)) {
    return "";
}
//filter file content to get only last hour messages
$msg_last_hour = array_filter($msg_full_history, 'getLastHourMsg');
//send to user site last hour messages
echo json_encode($msg_last_hour);

