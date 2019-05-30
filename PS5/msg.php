<?php
session_start();
if (isset($_POST["msg"])) {
    $name = $_SESSION["user_name"];
    $msg = $_POST["msg"];
    $path = "msg/" .$name. ".txt";
    file_put_contents($path, $msg . "\n", FILE_APPEND);
    echo file_get_contents($path);
}
?>

