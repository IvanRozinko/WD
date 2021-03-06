<?php
session_start();
include_once('config.php');
include_once('create_db.php');


$name = $_POST['name'];
$pass = $_POST['pass'];
$errors = [];


//validate input values
if (!preg_match('/^[A-Za-z]{1,20}$/', $name)) {
    $errors['name_error'] = 'Your name should consist max of 20 letters A-z';
}

if (!preg_match('/^[\w]{8,16}$/', $pass)) {
    $errors['pass_error'] = 'Your password should be 8 to 16 chars';
}

if (empty($errors)) {
    $_SESSION['user_name'] = $name;
    $name = strtolower($name);

    //if it is new user add him to database
    $num_of_users = mysqli_query($con, "SELECT name, pass FROM users WHERE name = '{$name}'");

    if (mysqli_num_rows($num_of_users) == 0) {

        $hash_pass = password_hash($pass, PASSWORD_DEFAULT);
        $stmt = mysqli_prepare($con, "INSERT INTO users (name, pass) VALUES (?, ?)");
         mysqli_stmt_bind_param($stmt, 'ss', $name, $hash_pass);
         mysqli_stmt_execute($stmt);

        //if it is existing user, check entered password
    } else if (!password_verify($pass,  mysqli_fetch_assoc($num_of_users)['pass'])) {

        $errors['wrong_pass'] = 'Wrong password';
    }
}


echo json_encode($errors, JSON_PRETTY_PRINT);

