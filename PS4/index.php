
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PS4_warmup</title>
</head>
<body>

<?php
//Sum of numbers in range -1000 to 1000
$sum = 0;

for ($i = -1000; $i <= 1000; $i++) {
    $sum += $i;
}
echo "Sum of numbers in range -1000 to 1000: <b>$sum</b></br>";
?>

<?php
//Sum of numbers ends with 2, 3 or 7 in range -1000 to 1000
$sum1 = 0;

for ($i = -1000; $i <= 1000; $i++) {
    if(isFit($i)){
        $sum1 += $i;
    }
}
echo "Sum of numbers in range -1000 to 1000: <b>$sum1</b><br>";

/**Checking is array contain number
 * @param $number - checking number
 * @return bool
 */
function isFit ($number) {
    $nums = array(2, 3, 7);
    $lastDigit = abs($number) % 10;
    return in_array($lastDigit, $nums);
}
?>

Select file to upload: <br>
<form action="index.php" method="post" enctype="multipart/form-data">
    <input type="file" name="file"/>
    <br>
    <input type="submit" value="Upload file" name="submit"/>
</form>
</body>
</html>
<?php
//displayFiles();

if (isset($_POST["submit"])) {
    upload();
}


function upload() {
    if ($_FILES["file"]["name"] != "") {
        $path = $_FILES["file"]["name"];
        $pathTo = "uploads/" . $path;
        move_uploaded_file($_FILES["file"]["tmp_name"], $pathTo);
    } else {
        echo "No file specified!<br>";
    }
    displayFiles();
}

function displayFiles() {
    $dir = "uploads/";
    $files = array_diff(scandir($dir), array(".", ".."));
    foreach ($files as $file) {
        echo "<a href='download.php?file=" . $file . "'>$file</a> : " . humanSize($dir . $file) . "<br>" ;
    }
}

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
    return round($humanSize, 1) . " ($value)";
}
?>




