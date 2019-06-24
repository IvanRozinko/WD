<?php
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}

$path = '../users/users.json';
$file = file_get_contents($path);
$name = $_POST['name'];
$pass = $_POST['pass'];
$users = json_decode($file, true);
if ($users == null) {
    $users = array();
}

if (!array_key_exists($name, $users)) {
    $users[$name] = $pass;
    $json_obj = json_encode($users);
    file_put_contents($path, $json_obj);
    echo 'new';
    exit;
} else if ($users[$name] === $pass) {
    echo 'exist';
    exit;
}
echo 'fail';


