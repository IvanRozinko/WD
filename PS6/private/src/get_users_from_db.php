<?php
//creating associative array name => password from database data
$sql_users = mysqli_query($con,'SELECT name, pass FROM users');
$temp_users = mysqli_fetch_all($sql_users, MYSQLI_ASSOC);
$users = [];
foreach ($temp_users as $item) {
    $users[$item['name']] = $item['pass'];
}
