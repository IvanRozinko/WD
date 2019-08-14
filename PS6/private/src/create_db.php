<?php
include_once ('connect_db.php');

//if not exist, create new database
$sql_create_new_db = 'CREATE DATABASE IF NOT EXISTS chat_db';
if (mysqli_query($con, $sql_create_new_db)) {
    mysqli_select_db($con, 'chat_db');

    $users_table = 'CREATE TABLE users (
                            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR  (256) NOT NULL,
                            pass VARCHAR (256) NOT NULL
                            ) DEFAULT CHARSET utf8mb4_unicode_ci';


    $msg_table = 'CREATE TABLE msg (
                            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
                            time TIMESTAMP,
                            msg_from VARCHAR (256) NOT NULL,
                            input VARCHAR (512) NOT NULL                            
                            ) DEFAULT CHARSET utf8mb4_unicode_ci';
    mysqli_query($con, $users_table);
    mysqli_query($con, $msg_table);
}


