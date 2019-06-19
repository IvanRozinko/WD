<?php
session_start();
$path = "msg/history.json";

if (!file_exists($path)) {
    fopen($path, "w");
    return;
}

/**
 * Filtering history.json content and returning messages sent not earlier than 1 hour ago
 * @param $msg - message from database
 * @return bool is it was sent earlier than 1 hour ago
 */
function getLastHourMsg($msg) {

    $time = $_POST["time"];
    $time_array = preg_split("/:/", $time);
    $hour = $time_array[0];
    $min = $time_array[1];
    $sec = $time_array[2];
    // strcasecmp() - function comparing strings in alphabetical order
    return  strcasecmp(($hour - 1) . ":" . $min . ":" . $sec, $msg->time) < 0;
}

$json = file_get_contents($path);
$msg_full_history = json_decode($json);
//filter file content to get only last hour messages
$msg_last_hour = array_filter($msg_full_history, "getLastHourMsg");
//send to user site last hour messages
echo json_encode($msg_last_hour);

