<?php
include_once 'config.php';
$content = $_POST['content'];


$file = file_get_contents(DATA);
$data_array = json_decode($file, true);

$updated_array = array_merge($data_array, $content);
$json_obj = json_encode($updated_array, JSON_PRETTY_PRINT);
file_put_contents(DATA, $json_obj);

print_r($content);
print_r($data_array);
print_r($updated_array);


