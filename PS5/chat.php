<?php
session_start();
if (isset($_POST["submit"])) {
print_r($_SESSION);
   $valid = true;

   if (!preg_match());

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

<h1>Easy Chat</h1>
<!--<h3>--><?php //echo $name; ?><!--</h3>-->
<form action="">
    <textarea name="textarea" id="" cols="70" rows="15"></textarea>
    <div class="message_block">
    <input name="message" type="text" id="message" placeholder="message...">
    <input name="send" type="submit" value="Send">
    </div>
</form>
</body>
</html>