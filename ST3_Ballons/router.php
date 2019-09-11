<?php

$route = $_POST['route'];

switch($route) {
    case 'updateContent':
        require  'private/updateContent.php';
        break;
    default:
        header('Location: index.html');
}
