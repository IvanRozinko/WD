<?php
include_once ('connect_db.php');
session_start();

//get date and time of last saved message in table msg
$sql_get_last_msg_time = mysqli_query($con, 'SELECT time FROM msg WHERE id=(SELECT  MAX(id) FROM msg)');
$last_msg_time = mysqli_fetch_all($sql_get_last_msg_time, MYSQLI_ASSOC);



if ($_SESSION['chat_modified_time'] == $last_msg_time) {
    exit(json_encode([]));
}


//get last hour messages from database
date_default_timezone_set('Europe/Kiev');
$min_time = date('Y-m-d H:i:s', time() - 3600);

$sql_last_hour_msgs = mysqli_query($con, "SELECT * FROM msg WHERE time >= '{$min_time}'");
$msgs = mysqli_fetch_all($sql_last_hour_msgs, MYSQLI_ASSOC);

if (empty($msgs)) {
    exit(json_encode([]));
}

//save to session new value of last msg
$_SESSION['chat_modified_time'] = $last_msg_time;


//send to user site last hour messages
echo json_encode($msgs, JSON_PRETTY_PRINT);



