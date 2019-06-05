<?php
session_start();
if (isset($_POST["send_time"])) {
    $name = $_SESSION["user_name"];
    $time = $_POST["send_time"];
    $input = $_POST["input"];
    $path = "msg/history.json";
//    $msg = "<p>[" . $time . "] <strong>" . $name. ":</strong> ". $input . "</p>";
    $chat_history = file_get_contents($path);
    $temp_array = json_decode($chat_history, true);
    if ($temp_array === null) {
        $temp_array = array();
    }
    $msg = array( array( "time" => $time, "from" => $name . ": ", "input" => $input));
    $mn = json_encode($msg);
//    array_push($temp_array, $msg);
    $updated_array = $temp_array + $msg;
    $json_object = json_encode($updated_array);
    file_put_contents($path, $mn, FILE_APPEND);
    echo json_encode($msg);
}
?>

