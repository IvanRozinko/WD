<?php
include_once('config.php');
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}


$file = file_get_contents(USERS_LIST);

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
$users = json_decode($file, true);
if ($users == null) {
    $users = [];
}


if ($is_valid) {
    if (!array_key_exists($name, $users)) {
        $users[$name] = $pass;
        $json_obj = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents(USERS_LIST, $json_obj);
        exit('new_user');
    } else if ($users[$name] === $pass) {
        exit('exist');
    }
    $errors['wrong_pass'] = 'Wrong password';
}

echo json_encode($errors, JSON_PRETTY_PRINT);

//
//$con = mysqli_connect('localhost', 'root', '', 'testsql');
//
//if (mysqli_connect_errno()) {
//    echo 'Failed to connect SQL ' . mysqli_connect_error();
//}
////
////$user = 'INSERT INTO users (name, pass) VALUES ("Ivan", "22222222")';
////mysqli_query($con, $user);
//
//
//$sql = "SELECT * FROM users";
//$result = mysqli_query($con, $sql);
//$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
//print_r($data);
