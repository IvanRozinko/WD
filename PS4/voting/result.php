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
if (isset($_POST["submit"])) {
    if (isset($_POST["breed"])) {
        writeToJSOn($_POST["breed"]);
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

?>
<div id="chart_div"></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="script.js"></script>
</body>
</html>
