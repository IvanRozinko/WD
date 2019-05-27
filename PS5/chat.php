<?php
session_start();
if (isset($_POST["submit"])) {
    print_r($_POST);
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Easy chat</title>
</head>
<body>


<form action="">
    <textarea name="textarea" id="" cols="80" rows="30"></textarea>
    <input name="message" type="text">
    <input name="send" type="submit" value="Send">
</form>
</body>
</html>