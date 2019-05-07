
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
<style type="text/css">
    .image_box {
        display: inline-block;
        text-align: center;
        margin: 5px 15px;
    }

</style>
<?php

$directory = "uploads/";
$files = array_diff(scandir($directory,  SCANDIR_SORT_NONE), array(".", ".."));
displayFiles($files);

if (isset($_POST["submit"])) {
    upload();
}


function upload() {
    if ($_FILES["file"]["name"] == "") {
        echo "No file specified!<br>";            //wrong place for message
    } else {
        $path = $_FILES["file"]["name"];
        $pathTo = "uploads/" . $path;
        move_uploaded_file($_FILES["file"]["tmp_name"], $pathTo);
        $uploadingFile = array($path);
        displayFiles($uploadingFile);               //displaying same file again if upload...
    }
}

function displayFiles($files) {
    foreach ($files as $file) {
        global $directory;
        $fileName = "$directory$file";
        //check if file is image than add small icon
        $image = isImage($fileName) ? "<img src='$fileName' alt='$fileName' width='200' height='120'>" : "";
        echo "<div class='image_box'>";
        echo "$image\n";
        echo "<p><a href='$fileName' download>$file</a><br>\n";
        echo  humanSize($fileName) . "</p>";
        echo "</div>";
    }

}

function isImage($filename) {
    $extension = preg_split("/[.]/", $filename);
    $imagExtensions = array("jpeg", "jpg", "png", "gif", "bmp");
    return in_array($extension[1], $imagExtensions);
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
    return round($humanSize, 1) . "($value)";
}
?>




