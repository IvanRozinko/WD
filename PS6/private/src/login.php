<?php
session_start();
include_once('config.php');
include_once('create_db.php');
include_once('get_users_from_db.php');

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
    $hash_pass = password_hash($pass, PASSWORD_DEFAULT);
    //if it is new user add him to database
    if (!array_key_exists($name, $users)) {
        $sql_insert_user = "INSERT INTO users (name, pass) VALUES ('" . $name . "', '" . $hash_pass . "')";
        mysqli_query($con, $sql_insert_user);
    //if it is existing user, check entered password
    } else if (!password_verify($pass, $users[$name])) {
        $errors['wrong_pass'] = 'Wrong password';
    }
}

echo json_encode($errors, JSON_PRETTY_PRINT);

