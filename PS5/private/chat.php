<?php
session_start();
$name = $_SESSION["user_name"];
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
<header>Easy Chat</header>
<h3><?php echo "Hey, " . $name . " !"; ?></h3>
<div  id="chat_window"></div>
<form action="">
    <div class="message_block">
    <input name="msg_input" type="text" id="msg_input" placeholder="Type here...">
    <input id="btn_send" name="btn_send" type="submit" value="Send">
    </div>
</form>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="script.js"></script>
</body>
</html>