<?php
include_once('config.php');
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}
if (isset($_POST['send_time'])) {
    $name = $_SESSION['user_name'];
    $date = $_POST['send_date'];
    $time = $_POST['send_time'];
    $input = $_POST['input'];


    $temp_array = json_decode(file_get_contents(CHAT_HISTORY));
    $msg = [
        'date' => $date,
        'time' => $time,
        'from' => $name . ': ',
        'input' => htmlspecialchars($input)
        ];
    $temp_array[] = $msg;
    //saving message to database file - 'json/history.json'
    file_put_contents(CHAT_HISTORY, json_encode($temp_array, JSON_PRETTY_PRINT));
    //sending message to user site
    echo json_encode($msg);
}

