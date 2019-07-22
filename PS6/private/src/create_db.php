<?php

//create connection to database
$con = mysqli_connect('localhost', 'root', '');

if ($error = mysqli_connect_errno()) {
    echo 'Can`t connect database' . $error;
}

//if not exist, create new database
$sql_create_new_db = 'CREATE DATABASE IF NOT EXISTS chat_db';
if (mysqli_query($con, $sql_create_new_db)) {
    mysqli_select_db($con, 'chat_db');

    $users_table = 'CREATE TABLE users (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR (256),
                            pass VARCHAR (256)
                            )';


    $msg_table = 'CREATE TABLE msg (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            date VARCHAR (10),
                            time VARCHAR (10),
                            msg_from VARCHAR (256),
                            input VARCHAR (512)                            
                            )';
    mysqli_query($con, $users_table);
    mysqli_query($con, $msg_table);
}


