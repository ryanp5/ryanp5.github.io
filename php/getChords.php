<?php
    //gets all files in folder chords
    $filePaths = array();
    $absolute_path = realpath(__DIR__ . '/..');
    $absolute_path .= "\Music\Chords";
    $dir = scandir($absolute_path,1);
    array_pop($dir);
    array_pop($dir);
   
    echo json_encode($dir);
?>