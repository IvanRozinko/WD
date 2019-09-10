<?php

$route = $_POST['route'];

switch($route) {
    case 'updateContent':
        require  'private/updateContent.php';
        break;
    case 'deleteBalloon':
        require  'private/deleteBalloon.php';
        break;
    default:
        header('Location: index.html');
}
