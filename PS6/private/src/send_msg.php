<?php
include_once ('connect_db.php');
session_start();
$name = $_SESSION['user_name'] . ': ';
$input = htmlspecialchars($_POST['input']);


//save message to database table 'msg'
$stmt = mysqli_prepare($con, "INSERT INTO msg (msg_from, input) VALUES (?, ?) ");
mysqli_stmt_bind_param($stmt, 'ss', $name, $input);
mysqli_stmt_execute($stmt);


