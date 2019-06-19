<?php
session_start();
if (isset($_POST["send_time"])) {
    $name = $_SESSION["user_name"];
    $time = $_POST["send_time"];
    $input = $_POST["input"];
    $path = "msg/history.json";

    $temp_array = json_decode(file_get_contents($path));
    $msg = array (
        "time" => $time,
        "from" => $name . ": ",
        "input" => $input
    );
    $temp_array[] = $msg;
    //saving message to database file - "msg/history.json"
    file_put_contents($path, json_encode($temp_array));
    //sending message to user site
    echo json_encode($msg);
}

