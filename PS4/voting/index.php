<?php
session_start();
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
<h4><?= $vote_error ?></h4>
<section class="chart_wrap">
    <form action="save_vote.php" method="post">
        <h3>What is you favorite dog breed?</h3>
        <?php
            $breeds = [
                    'boxer' => 'Boxer',
                    'collie' => 'Collie',
                    'akita' => 'Akita',
                    'poodle' => 'Poodle',
                    'jack' => 'Jack-russel-terrier',
            ];
            foreach ($breeds as $key => $value) {
               echo  '<label for="'. $key . '"><input id="'. $key .'" type="radio" name="breed" value="' . $key .'">    ' . $value .'</label>';
            }
        ?>
        <input type="submit" value="Vote" name="submit">
    </form>
</section>
</body>
</html>

