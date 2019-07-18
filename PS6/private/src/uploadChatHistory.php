<?php
include_once('config.php');
include_once ('getLastHourMsg.php');
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}

/*
get last time of changing file and if its differs from time saved in SESSION -> read all messages from file and
send last hour messages to chat.php
*/

$con = mysqli_connect('localhost', 'root', '', 'chat_db');
if ($error = mysqli_connect_errno()) {
    exit('Can`t connect database' . $error);
}
$dates = mysqli_query($con, 'SELECT date, time FROM msg');
$temp = mysqli_fetch_all($dates, MYSQLI_ASSOC);


if ($_SESSION['chat_modified_time'] == ($chat_modified_time = filemtime(CHAT_HISTORY))) {
    exit('');
}

$sql_msg = mysqli_query($con, 'SELECT * FROM msg');
$full_history = mysqli_fetch_all($sql_msg, MYSQLI_ASSOC);
//print_r($full_history);


if (empty($full_history)) {
    exit('');
}

//filter array with file content to get only last hour messages
$msg_last_hour = array_filter($full_history, 'getLastHourMsg');
$_SESSION['chat_modified_time'] = $chat_modified_time;
//send to user site last hour messages
echo json_encode($msg_last_hour);



