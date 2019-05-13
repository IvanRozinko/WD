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
echo "<p>Sum of numbers in range -1000 to 1000: <b>$sum</b></p>";
echo "<hr>";
?>

<?php
//Sum of numbers ends with 2, 3 or 7 in range -1000 to 1000
$sum1 = 0;
for ($i = -1000; $i <= 1000; $i++) {
    if(isFit($i)){
        $sum1 += $i;
    }
}
echo "<p>Sum of numbers in range -1000 to 1000: <b>$sum1</b></p>";
echo "<hr>";
?>

<p>Select file to upload:</p>
<form method="post" enctype="multipart/form-data">
    <input type="file" name="file"/>
    <input type="submit" value="Upload file" name="submit"/>
    <input type="submit" value="Display files" name="display"/>
</form>
<?php
$directory = "uploads/";
$files = array_diff(scandir($directory,  SCANDIR_SORT_NONE), array(".", ".."));
if (isset($_POST["submit"])) {
    $file = $_FILES["file"]["name"];
     if ($file == "") {
        echo "No file specified!<br>";
    } else {
         upload($file);
    }
} elseif (isset($_POST["display"])) {
    displayFiles($files);
}
echo "<hr>";
?>

<form method="post" >
       <input type="submit" value="Draw chessboard" name="draw_chess"/>
</form>
<?php
if(isset($_POST["draw_chess"])) {
    drawChessboard();
}
echo "<hr>";
?>

<form method="post">
    <input type="number" name="number">
    <input type="submit" value="Calculate" name="calculateSum">
</form>
<?php
if (isset($_POST["calculateSum"])) {
    $number = $_POST["number"];
    echo "<p>Sum of digits in '$number'   = <b>" . calculateSum($number) . "</b></p>";
}
echo "<hr>";
?>

<form method="post">
    <input type="submit" value="Generate array" name="array_gen">
</form>
<?php
if (isset($_POST["array_gen"])){
    echo "Resulted array : ";
    print_r(generateArray());
}
echo "<hr>";
?>

<?php
counter();
echo "<p>This is your visit № " . $_SESSION["counter"] . "</p>";
echo "<hr>";
?>

<form method="post">
    <textarea name="textarea" cols="30" rows="10"></textarea>
    <input type="submit" name="count_chars" value="Count chars">
</form>
</body>
</html>
<?php
if (isset($_POST["count_chars"])) {
    $text = $_POST["textarea"];
    echo showStats($text);
}
echo "<hr>";
?>

<?php
/**
 * Printing amount of strings, characters and whitespaces in textarea
 * @param $text
 * @return string
 */
function showStats($text) {
    $stringAmount = sizeof(preg_split("/\n/", $text));
    $whitespaceAmount = substr_count($text, " ");
    $charAmount = iconv_strlen($text) - $whitespaceAmount;
    return "Amount of strings : " . $stringAmount . "<br>" .
            "Amount of characters : " . $charAmount . "<br>" .
             "Amount of whitespaces : " . $whitespaceAmount . "<br>";
}

/**
 * Counting amount of visiting to web page using sessions
 */
function counter(){
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
function generateArray() {
    $array = array();
    for ($i = 0; $i < 100; $i++){
        $array[$i] = rand(1, 10);
    }
    $arrayUnique = array_reverse(array_unique($array));
    array_walk($arrayUnique, function(&$value) {
        $value *= 2;
    });
    return $arrayUnique;
}


/**
 * Calculating sum of digits in number
 * @param $number
 * @return int  - sum of digits
 */
function calculateSum ($number) {
    return array_sum(preg_split("//",$number));
}

/**Checking is array contain number
 * @param $number - checking number
 * @return bool
 */
function isFit ($number) {
    $nums = array(2, 3, 7);
    $lastDigit = abs($number) % 10;
    return in_array($lastDigit, $nums);
}

/**
 * Drawing chessboard 8x8 blocks
 */
function drawChessboard() {
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
 */
function upload($file) {
    global $directory;
    $pathTo = $directory . $file;
    move_uploaded_file($_FILES["file"]["tmp_name"], $pathTo);
    echo "File uploaded!";
}

/**
 * Displaying files from array received as a parameter. If file is image, than shows small preview
 * @param $files array of files to be displayed
 */
function displayFiles($files) {
    foreach ($files as $file) {
        global $directory;
        $fileName = "$directory$file";
        //check if file is image than add small icon
        $image = isImage($fileName) ? "<img src='$fileName' alt='$fileName'>" :
                                        "<img src='img/file.png' alt='file_image3'>";
        echo "<div class='image_box'>";
        echo "$image\n";
        echo "<p><a href='$fileName' download>$file</a><br>\n";
        echo  humanSize($fileName) . "</p>";
        echo "</div>";
    }
}

/**
 * Checking is file an image
 * @param $filename
 * @return bool
 */
function isImage($filename) {
    $extension = preg_split("/[.]/", $filename);
    $imagExtensions = array("jpeg", "jpg", "png", "gif", "bmp");
    return in_array($extension[1], $imagExtensions);
}

/**
 * Converting file size to readable value
 * @param $file
 * @return string
 */
function humanSize($file) {
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
    return round($humanSize, 1) . "($value)";
}





