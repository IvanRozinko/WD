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
<?php
session_start();
session_regenerate_id();
$total_votes = 0;
 $_SESSION["total_votes"];

if (isset($_POST["submit"])) {

    if (isset($_POST["breed"]) && hasNotVoted(session_id()) ) {
        writeToJSOn($_POST["breed"]);
//        header("Location: result.php");
    }
    else {
        echo "You are trying to cheat!";
    }
}
/**
 * Opens json file, converting it's data to array than adding user vote to this array and,
 * saving result back same file
 * @param $breed - value of user input
 */
function writeToJSON($breed)
{
    $file = "json/results.json";
    $json_object = file_get_contents($file);
    $data = json_decode($json_object, true);
    if ($data == null) {
        $data = array();
    }
    array_key_exists($breed, $data) ? $data[$breed]++ : $data[$breed] = 1;
    $json_object = json_encode($data);
    file_put_contents($file, $json_object);
}

function hasNotVoted($id)
{

    $file = "json/voted.json";
    if (!file_exists($file)) {
        file_put_contents($file, json_encode(array($_SESSION["total_votes"]++ => $id)));

        return true;
    }
    $json_object = file_get_contents($file);
    $IDs = json_decode($json_object, true);
    print_r($IDs);
    echo $_SESSION["total_votes"];

    if (in_array($id, $IDs)) {
        return false;
    }
   $IDs[$_SESSION["total_votes"]++] = $id;
    file_put_contents($file, json_encode($IDs));
    return true;
}

?>
<div>
    <input type="button" name="return" value="<< Return">
</div>
<div class="chart_wrap">
    <div id="chart_div"></div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="script.js"></script>
</body>
</html>
