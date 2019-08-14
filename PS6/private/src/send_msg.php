<?php
include_once ('connect_db.php');
session_start();
$name = $_SESSION['user_name'] . ': ';
$date = $_POST['send_date'];
$time = $_POST['send_time'];
$input = htmlspecialchars($_POST['input']);


//save message to database table 'msg'
mysqli_query($con, "INSERT INTO msg (msg_from, input) VALUES ('{$name}', '{$input}') ");



