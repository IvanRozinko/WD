<?php
session_start();
if (isset($_POST["send_time"])) {
    $name = $_SESSION["user_name"];
    $time = $_POST["send_time"];
    $input = $_POST["input"];
    $path = "msg/history.json";
//    $msg = "<p>[" . $time . "] <strong>" . $name. ":</strong> ". $input . "</p>";
    $msg = array ($time => "<strong>" . $name. ":</strong> ". $input);
    $json_object = json_encode($msg);
    file_put_contents($path, $json_object, FILE_APPEND);
    echo json_encode($msg);
}
?>

