<?php
session_start()
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Result</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
<form method="post" action="index.php">
    <div>
        <input type="submit" name="return" value="<< Return"><?php if ($_SESSION['counted']) echo $_SESSION['counted'] ?>
    </div>
</form>
<div class="chart_wrap">
    <div id="chart_div"></div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="script.js"></script>
</body>
</html>
