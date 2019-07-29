<?php
$route = $_POST['route'];


switch ($route) {
    case 'login':
        require '../private/src/login.php';
        break;
    case 'send_message':
        require '../private/src/send_msg.php';
        break;
    case 'upload_chat_history':
        require '../private/src/upload_chat_history.php';
        break;
    default:
        header('Location: index.php');
}


