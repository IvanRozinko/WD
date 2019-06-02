<?php
session_start();
if (isset($_POST["date"])) {
    $name = $_SESSION["user_name"];
    $time = $_POST["date"];
    $input = $_POST["input"];
    $path = "msg/" .$name. ".txt";
    $msg = "<p>[" . $time . "] <strong>" . $name. ":</strong> ". $input . "</p>";
    file_put_contents($path, $msg, FILE_APPEND);
    echo $msg;
}
?>

