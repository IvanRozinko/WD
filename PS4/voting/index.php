<?php
//session_start();
$vote_error = '';
if (isset($_SESSION['vote_error'])) {
    $vote_error = $_SESSION['vote_error'];
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css" type="text/css">
    <title>Voting</title>
</head>
<body>
<h4><?=$vote_error?></h4>
<section class="chart_wrap">
    <form action="result.php" method="post">
        <h3>What is you favorite dog breed?</h3>
        <label for="boxer">
            <input id="boxer" type="radio" name="breed" value="boxer"> Boxer
        </label>
        <label for="collie">
            <input id="collie" type="radio" name="breed" value="collie"> Collie
        </label>
        <label for="akita">
            <input id="akita" type="radio" name="breed" value="akita"> Akita
        </label>
        <label for="poodle">
            <input id="poodle" type="radio" name="breed" value="poodle"> Poodle
        </label>
        <label for="jack">
            <input id="jack" type="radio" name="breed" value="Jack-russel-terrier"> Jack-russel-terrier
        </label>
        <input type="submit" value="Vote" name="submit">
    </form>
</section>
</body>
</html>

