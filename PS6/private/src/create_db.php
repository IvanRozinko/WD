<?php

$con = mysqli_connect('localhost', 'root', '');
//if not exist, create new database
if (mysqli_query($con, 'CREATE DATABASE IF NOT EXISTS chat_db COLLATE utf8mb4_unicode_ci ')) {
    include_once ('connect_db.php');


    $users_table = 'CREATE TABLE users (
                            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR  (256) NOT NULL,
                            pass VARCHAR (256) NOT NULL
                            )';


    $msg_table = 'CREATE TABLE msg (
                            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
                            time TIMESTAMP,
                            msg_from VARCHAR (256) NOT NULL,
                            input VARCHAR (512) NOT NULL                            
                            )';
    mysqli_query($con, $users_table);
    mysqli_query($con, $msg_table);
}


