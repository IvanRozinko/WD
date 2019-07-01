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

if (isset($_POST["submit"]) && isset($_POST["breed"])) {

    if (hasNotVoted(session_id())) {
        $counted = " Your vote counted!";
        writeToJSOn($_POST["breed"]);
    } else {
        header("Location: index.php");
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

    if (!file_exists($file)) {
        file_put_contents($file, json_encode(array($breed => 1)));
        return;
    }
    $json_object = file_get_contents($file);
    $data = json_decode($json_object, true);

    if ($data == null) {
        $data = array();
    }

    array_key_exists($breed, $data) ? $data[$breed]++ : $data[$breed] = 1;
    $json_object = json_encode($data);
    file_put_contents($file, $json_object);
}

/**Checking has user with this session id already gave his vote, if not than saving
 * session id to json file
 * @param $id - of current session
 * @return bool
 */
function hasNotVoted($id)
{
    $file = "json/voted.json";

    if (!file_exists($file)) {
        file_put_contents($file, json_encode(array($id)));
        return true;
    }
    $json_object = file_get_contents($file);
    $IDs = json_decode($json_object, true);

    if (in_array($id, $IDs)) {
        return false;
    }

    array_push($IDs, $id);
    file_put_contents($file, json_encode($IDs));
    return true;
}

?>
<form method="post" action="index.php">
    <div>
        <input type="submit" name="return" value="<< Return"><?php if (isset($counted)) echo $counted ?>
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
