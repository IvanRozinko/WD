<?php
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: error.php');
}
$path = "../msg/history.json";

if (!file_exists($path)) {
    fopen($path, "w");
    return;
}

$time = $_POST["time"];
/**
 * Filtering history.json content and returning messages sent not earlier than 1 hour ago
 * @param $msg - message from database
 * @return bool is it was sent earlier than 1 hour ago
 */
function getLastHourMsg($msg) {
    global $time;
    $time_array = preg_split("/:/", $time);
    // strcasecmp() - function comparing strings in alphabetical order
    return  strcasecmp((intval($time_array[0])- 1) . ":" . $time_array[1] . ":" . $time_array[2], $msg -> time) < 0;
}

$json = file_get_contents($path);
$msg_full_history = json_decode($json);
//filter file content to get only last hour messages
$msg_last_hour = array_filter($msg_full_history, "getLastHourMsg");
//send to user site last hour messages
echo json_encode($msg_last_hour);

