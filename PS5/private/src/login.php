<?php
include_once('../../public/config.php');
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}

$file = file_get_contents(USERS_LIST);
$name = $_POST['name'];
$pass = $_POST['pass'];

//validate input values
if (!preg_match('/^[A-Za-z]{1,20}$/', $name)) {
    echo "fail";
    exit;
}

if (!preg_match('/^[\w]{8,16}$/', $pass)) {
    echo 'fail';
    exit;
}

$_SESSION['user_name'] = $name;

$users = json_decode($file, true);
if ($users == null) {
    $users = array();
}

if (!array_key_exists($name, $users)) {
    $users[$name] = $pass;
    $json_obj = json_encode($users);
    file_put_contents(USERS_LIST, $json_obj);
    echo 'new';
    exit;
} else if ($users[$name] === $pass) {
    echo 'exist';
    exit;
}
echo 'fail';


