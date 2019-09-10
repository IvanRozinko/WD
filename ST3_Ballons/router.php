<?php

$route = $_POST['route'];

switch($route) {
    case 'updateContent':
        require dirname(__DIR__, 1) . '/private/updateContent.php';
        break;
    case 'deleteBalloon':
        require dirname(__DIR__, 1) . '/private/deleteBalloon.php';
        break;
    default:
        header('Location: index.html');
}
