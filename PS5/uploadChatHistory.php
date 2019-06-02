<?php
session_start();
$name = $_SESSION["user_name"];
$time = $_POST["time"];
$path = "msg/" .$name. ".txt";
if (!file_exists($path)) {
    fopen($path, "w");
    return;
}
// TODO: upload only last  1 hour messages
echo file_get_contents($path);

