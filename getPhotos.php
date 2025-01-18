<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$photoDir = './photo/';
$photos = array();

if (is_dir($photoDir)) {
    $files = scandir($photoDir);
    foreach ($files as $file) {
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
            $photos[] = $photoDir . $file;
        }
    }
}

echo json_encode($photos);
?> 