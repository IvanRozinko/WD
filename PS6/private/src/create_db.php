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
    $sql_create_users_table =
        'CREATE TABLE users (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR (256),
                            pass VARCHAR (256)
                            )';
    mysqli_query($con, $sql_create_users_table);

    $sql_create_msg_table =
        'CREATE TABLE msg (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            date VARCHAR (256),
                            time VARCHAR (256),
                            from VARCHAR (256),
                            input VARCHAR (256)                            
                            )';
    mysqli_query($con, $sql_create_msg_table);
}
