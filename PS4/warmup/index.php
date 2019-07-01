<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PS4_warmup</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
<?php
session_start();
//Sum of numbers in range -1000 to 1000
$sum = 0;
for ($i = -1000; $i <= 1000; $i++) {
    $sum += $i;
}
?>
<label>Sum of numbers in range -1000 to 1000: </label>
<output><b><?php echo $sum?></b></output>
<hr>

<?php
//Sum of numbers ends with 2, 3 or 7 in range -1000 to 1000
$sum1 = 0;
for ($i = -1000; $i <= 1000; $i++) {
    if(is_fit($i)){
        $sum1 += $i;
    }
}
?>
<label>Sum of numbers in range -1000 to 1000: </label>
<output><b><?php echo $sum1?></b></output>
<hr>

<p>Select file to upload:</p>
<form method="post" enctype="multipart/form-data">
    <input type="file" name="file"/>
    <input type="submit" value="Upload file" name="upload"/>
    <input type="submit" value="Display files" name="display"/>
</form>
<?php
$directory = "uploads/";
$files = array_diff(scandir($directory,  SCANDIR_SORT_NONE), array(".", ".."));
if (isset($_POST["upload"])) {
    $file = $_FILES["file"]["name"];
     if ($file == "") {
        echo "No file specified!<br>";
    } else {
         upload($file, $directory);
    }
} else if (isset($_POST["display"])) {
    display_files($files, $directory);
}
?>
<hr>
<form method="post">
       <input type="submit" value="Draw chessboard" name="draw_chess"/>
</form>
<?php
if(isset($_POST["draw_chess"])) {
    draw_chessboard();
}
?>
<hr>
<form method="post">
    <input type="text" name="number">
    <input type="submit" value="Calculate" name="calculateSum">
</form>
<?php
$sumOfDigits = "";
if (isset($_POST["calculateSum"])) {
    $number = $_POST["number"];
    $sumOfDigits = array_sum(str_split( $number));
}
?>
<label>Sum of digits = <b><?php echo $sumOfDigits?></b></label>
<hr>

<form method="post">
    <input type="submit" value="Generate array" name="array_gen">
</form>
<?php
if (isset($_POST["array_gen"])){
    echo "Resulted array : ";
    print_r(generate_array());
}
?>
<hr>

<?php
counter();
echo "<p>This is your visit № " . $_SESSION["counter"] . "</p>";
?>
<hr>
<form method="post">
    <textarea name="textarea" cols="30" rows="10"><?php if (isset($_POST["textarea"])) echo $_POST["textarea"]?></textarea>
    <input type="submit" name="count_chars" value="Count chars">
</form>
</body>
</html>
<?php

if (isset($_POST["count_chars"])) {
    $text = $_POST["textarea"];
    echo show_stats($text);
}
?>
<hr>
<?php
/**
 * Printing amount of strings, characters and whitespaces in textarea
 * @param $text
 * @return string
 */
function show_stats($text)
{
    $stringAmount = count(preg_split("/\n/", $text));
    $whitespaceAmount = substr_count($text, " ");
    $charAmount = iconv_strlen($text) - $whitespaceAmount;
    return "Amount of strings : " . $stringAmount . "<br>" .
            "Amount of characters : " . $charAmount . "<br>" .
             "Amount of whitespaces : " . $whitespaceAmount . "<br>";
}

/**
 * Counting amount of visiting to web page using sessions
 */
function counter()
{
    if (!isset($_SESSION["counter"])){
        $_SESSION["counter"] = 0;
    } else {
        $_SESSION["counter"]++;
    }
}
/**
 * Generating array of 100 elements, delete repeating elements,
 * reverse it and doubling each
 */
function generate_array() {
    $array = array();
    for ($i = 0; $i < 100; $i++){
        $array[$i] = mt_rand(1, 10);
    }
    $arrayUnique = array_unique($array);
    sort( $arrayUnique);
    $arrayUnique = array_reverse($arrayUnique);
    array_walk($arrayUnique, function(&$value) {
        $value *= 2;
    });
    return $arrayUnique;
}


/**Checking is array contain number
 * @param $number - checking number
 * @return bool
 */
function is_fit($number) {
    $nums = array(2, 3, 7);
    $lastDigit = abs($number) % 10;
    return in_array($lastDigit, $nums);
}

/**
 * Drawing chessboard 8x8 blocks
 */
function draw_chessboard()
{
    $boardSize = 8;
    echo "<div class='container_board'>";
    for($i = 0; $i < $boardSize; $i++) {
        for($j = 0; $j < $boardSize; $j++) {
            echo ($i % 2 == $j % 2) ? "<div class='block white'></div>" :
                                         "<div class='block black'></div>";
        }
    }
    echo "</div>";
}

/**
 * Uploading chosen file to directory uploads/ or shows message to specify file
 * @param $file - uploading file
 * @param $directory
 */
function upload($file, $directory) {
    $pathTo = $directory . $file;
    move_uploaded_file($_FILES["file"]["tmp_name"], $pathTo);
    echo "File uploaded!";
}

/**
 * Displaying files from array received as a parameter. If file is image, than shows small preview
 * @param $files array of files to be displayed
 * @param $directory
 */
function display_files($files, $directory)
{
    foreach ($files as $file) {
        $fileName = $directory . $file;
        //check if file is image than add small icon
        $image = is_image($fileName) ? "<img src='$fileName' alt='$fileName'>" :
                                        "<img src='img/file.png' alt='file_image3'>";
        $humanSize = human_size($fileName);
        $icon = "<div class='image_box'>$image<p><a href='$fileName' download>$file</a><br>$humanSize</p></div>";
        echo $icon;
    }
}

/**
 * Checking is file an image
 * @param $filename
 * @return bool
 */
function is_image($filename) {
    $extension = preg_split("/[.]/", $filename);
    $imagExtensions = array("jpeg", "jpg", "png", "gif", "bmp");
    return in_array($extension[1], $imagExtensions);
}

/**
 * Converting file size to readable value
 * @param $file
 * @return string
 */
function human_size($file)
{
    $humanSize = floatval(filesize($file));
    $value = "";
    $sizes = array(
        pow(1024, 4),
        pow(1024, 3),
        pow(1024, 2),
        1024,
        1
    );
    $values = array(
        "Tb",
        "Gb",
        "Mb",
        "Kb",
        "bytes"
    );
    for($i = 0; $i < sizeof($sizes); $i++){
        if ($humanSize >= $sizes[$i]){
            $humanSize /= $sizes[$i];
            $value = $values[$i];
        }
    }
    return round($humanSize, 1) . ($value);
}





