<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../private/style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico&display=swap" rel="stylesheet">
    <title>User Auth</title>
</head>
<body>
<?php
if (isset($_POST["submit"])) {
    session_start();
    $valid = true;
    $name = $_POST["name"];
    $pass = $_POST["pass"];


    if (!preg_match("/^\w{1,20}$/", $name)) {
        $valid = false;
        $error_name = "Your name should consist max of 20 letters A-z";
    }

    if (!preg_match("/^[\w]{8,16}$/", $pass)) {
        $valid = false;
        $error_pass = "Your password should be 8 to 16 chars";
    }

    if ($valid) {
        $path = "users/users.json";
        $file = file_get_contents($path);

        $users = json_decode($file, true);
        if ($users == null) {
            $users = array();
        }

        if (!array_key_exists($name, $users)) {
            $users[$name] = $pass;
            $json_obj = json_encode($users);
            file_put_contents($path, $json_obj);
            header("Location: private/chat.php");
        } else if ($users[$name] === $pass) {
            header("Location: private/chat.php");
        }
        $_SESSION["user_name"] = $name;
        $error_user_exist = "Wrong password";
    }
}
?>

<header>Easy Сhat</header>
<div class="container">
    <form action="" method="post">
        <?php if(isset($error_user_exist)) echo "<p class='invalid'>$error_user_exist</p>" ?>
        Enter your name
        <?php if(isset($error_name)) echo "<p class='invalid'>$error_name</p>" ?>
        <input name="name" id="name" type="text" value="<?php if(isset($name)) echo $name ?>">
        Enter your password
        <?php if(isset($error_pass)) echo "<p class='invalid'>$error_pass</p>" ?>
        <input name="pass" id="pass" type="password" value="<?php if(isset($pass)) echo $pass ?>">
        <input name="submit" type="submit" value="Log in">
        <div class="shadow"></div>
    </form>
</div>
</body>
</html>

<!--https://docs.php.earth/faq/misc/structure/-->
<!--https://ru.stackoverflow.com/questions/283498/%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%BF%D0%B0%D0%BF%D0%BE%D0%BA-%D1%81%D0%B0%D0%B9%D1%82%D0%B0-%D0%9A%D0%B0%D0%BA-%D0%B3%D1%80%D0%B0%D0%BC%D0%BE%D1%82%D0%BD%D0%B5%D0%B9-->
<!--https://stackoverflow.com/questions/19648760/project-structure-for-php-->