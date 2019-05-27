<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico&display=swap" rel="stylesheet">
    <title>User Auth</title>
</head>
<body>

<h1>Easy Chat</h1>
<div class="container">
    <form action="chat.php" method="post">
        <label for="name">Enter your name</label>
        <input name="name" id="name" type="text">
        <label for="pass">Enter your password</label>
        <input name="pass" id="pass" type="password">
        <input name="submit" type="submit" value="Log in">
    </form>
</div>
</body>
</html>
