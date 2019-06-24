<?php
session_start();
$_SESSION['session_id'] = session_id();
//if (isset($_SERVER['HTTP_REFERER']) ) {
//    echo($_SERVER['HTTP_REFERER']);
//}
//if ($_SERVER['HTTP_REFERER']);
if (isset($_POST['submit'])) {
    $_SESSION['user_name'] = $name;
    $valid = true;
    $name = $_POST['name'];
    $pass = $_POST['pass'];


    if (!preg_match('/^\w{1,20}$/', $name)) {
        $valid = false;
        $error_name = 'Your name should consist max of 20 letters A-z';
    }

    if (!preg_match('/^[\w]{8,16}$/', $pass)) {
        $valid = false;
        $error_pass = 'Your password should be 8 to 16 chars';
    }
//    if ($valid) {
//       header('Location: ../private/src/login.php');
//    }
}
?>
<!doctype html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <link rel='stylesheet' type='text/css' href='../private/style.css'>
    <link href='https://fonts.googleapis.com/css?family=Montserrat|Pacifico&display=swap' rel='stylesheet'>
    <title>User Auth</title>
</head>
<body>

<div class='frame'></div>
<section>
    <div class='spacing'></div>
    <header>Easy Сhat</header>
    <div class='spacing'></div>
    <div class='container'>
    <form action='' method='post'>
        Enter your name
        <p id="name_error" class="hidden invalid">Your name should consist max of 20 letters A-z</p>
        <input name='name' id='name' type='text' value='<?php if(isset($name)) echo $name ?>'>
        Enter your password
        <p  id="pass_error" class="hidden invalid">Your password should be 8 to 16 chars</p>
        <input name='pass' id='pass' type='password' value='<?php if(isset($pass)) echo $pass ?>'>
        <input name='submit' type='submit' value='Log in'>
        <div class='shadow'></div>
    </form>
</div>
</section>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src='../private/isValid.js'></script>
</body>
</html>
