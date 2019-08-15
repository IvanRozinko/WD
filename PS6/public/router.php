<?php
$route = $_POST['route'];


switch ($route) {
    case 'login':
        require dirname(__DIR__, 1) . '/private/src/login.php';
        break;
    case 'send_message':
        require dirname(__DIR__, 1) . '/private/src/send_msg.php';
        break;
    case 'upload_chat_history':
        require dirname(__DIR__, 1) . '/private/src/upload_chat_history.php';
        break;
    default:
        header('Location: index.php');
}


