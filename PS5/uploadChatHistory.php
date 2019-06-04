<?php
session_start();
$time = $_POST["time"];
$path = "msg/history.json";
if (!file_exists($path)) {
    fopen($path, "w");
    return;
}
// TODO: upload only last  1 hour messages
//$msg_full_history = file_get_contents($path);
//$time_array = preg_split(":", $time);
//$hour = $time[0];
//$min = $time[1];
//$sec = $time[2];
//$msg_last_hour = strstr($msg_full_history, )
$json = file_get_contents($path);
$msg_full_history = json_decode($json, true);
foreach ($msg_full_history as $key => $value) {
    
}

echo "just" ;

