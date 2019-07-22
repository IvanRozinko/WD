<?php
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location:' . STARTING_PAGE);
}

include_once('config.php');
include_once('create_db.php');
include_once('get_users_from_db.php');


$name = $_POST['name'];
$pass = $_POST['pass'];

$errors = [];
$is_valid = true;

//validate input values
if (!preg_match('/^[A-Za-z]{1,20}$/', $name)) {
    $is_valid = false;
    $errors['name_error'] = 'Your name should consist max of 20 letters A-z';
}

if (!preg_match('/^[\w]{8,16}$/', $pass)) {
    $is_valid = false;
    $errors['pass_error'] = 'Your password should be 8 to 16 chars';
}

$_SESSION['user_name'] = $name;
$hash_pass = password_hash($pass, PASSWORD_DEFAULT);

if ($is_valid) {
    //if it is new user add him to database
    if (!array_key_exists($name, $users)) {
        $sql_insert_user = "INSERT INTO users (name, pass) VALUES ('".$name."', '". $hash_pass."')";
        mysqli_query($con, $sql_insert_user);
        exit('new_user');
        //if it is existing user, check entered password
    }else if (password_verify($pass, $users[$name])) {
        exit('exist');
    }
    $errors['wrong_pass'] = 'Wrong password';
}

echo json_encode($errors, JSON_PRETTY_PRINT);

