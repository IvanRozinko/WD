<?php
include_once('get_last_hour_msg.php');
session_start();

/*
get  time of last message in msc table db_chat if its differs from time saved in SESSION -> read all messages from file and
send last hour messages to chat.php
*/

$error = [];
//connect to database
$con = mysqli_connect('localhost', 'root', '', 'chat_db');

if ($con_error = mysqli_connect_errno()) {
    $error['db_connection'] = 'Can`t connect database' . $con_error;
}

//get date and time of last saved message in table msg
$sql_get_last_msg_time = mysqli_query($con, 'SELECT date, time FROM msg WHERE id=(SELECT  MAX(id) FROM msg)');
$last_msg_time = mysqli_fetch_all($sql_get_last_msg_time, MYSQLI_ASSOC);


if ($_SESSION['chat_modified_time'] == $last_msg_time) {
    exit();
}

//get all messages from database
$sql_get_full_history = mysqli_query($con, 'SELECT * FROM msg');
$full_history = mysqli_fetch_all($sql_get_full_history, MYSQLI_ASSOC);

if (empty($full_history)) {
    exit();
}

//filter array with file content to get only last hour messages
$msg_last_hour = array_filter($full_history, 'getLastHourMsg');
//save to session new value of last msg
$_SESSION['chat_modified_time'] = $last_msg_time;

if (!empty($error)) {
    array_merge($error, $msg_last_hour);
}
//send to user site last hour messages
echo json_encode($msg_last_hour, JSON_PRETTY_PRINT);



