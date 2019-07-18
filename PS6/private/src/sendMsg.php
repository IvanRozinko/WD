<?php
include_once('config.php');
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}

$name = $_SESSION['user_name'];
$date = $_POST['send_date'];
$time = $_POST['send_time'];
$input = htmlspecialchars($_POST['input']);


//connect to database
$con = mysqli_connect('localhost', 'root', '', 'chat_db');
if ($error = mysqli_connect_errno()) {
    echo 'Can`t connect database' . $error;
}
mysqli_query($con, "INSERT INTO msg (date, time, msg_from, input) 
                                    VALUES ($date, $time, $name, $input) ");

$msg = [
    'date' => $date,
    'time' => $time,
    'msg_from' => $name . ': ',
    'input' => $input
];

//sending message to user site
echo json_encode($msg);


