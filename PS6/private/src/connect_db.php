<?php
//create connection to database
$con = mysqli_connect('localhost', 'root', '', 'chat_db');

if ($error = mysqli_connect_errno()) {
    echo 'Can`t connect database' . $error;
}
