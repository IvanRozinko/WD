<?php
include_once 'config.php';

$content = $_POST['content'];
$index = array_keys($content)[0];

$file = file_get_contents(DATA);
$data_array = json_decode($file, true);

if ($content[$index]['content'] === '') {
    unset($data_array[$index]);
} else {
    $data_array[$index] = $content[$index];
}

$json_obj = json_encode($data_array, JSON_PRETTY_PRINT);
file_put_contents(DATA, $json_obj);


