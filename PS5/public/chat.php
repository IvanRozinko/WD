<?php
session_start();
if ($_SESSION['session_id'] !== session_id()) {
    header('Location: ../../public/index.php');
}
$name = $_SESSION['user_name'];
$_SESSION['chat_modified_time'] = time();
?>
<!doctype html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <link rel='stylesheet' href='css/style.css'>
    <title>Easy chat</title>
</head>
<body>
<div class='frame'></div>
<section>
    <div class='spacing'></div>
    <header>Easy Chat</header>
    <div class='spacing'></div>
    <h3>Hey, <?php echo $name ?> !</h3>
    <div id='chat_window'></div>
    <form action=''>
        <div class='message_block'>
            <input name='msg_input' type='text' id='msg_input' placeholder='Type here...'>
            <input id='btn_send' name='btn_send' type='submit' value='Send'>
        </div>
    </form>
</section>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src='js/script.js'></script>
</body>
</html>