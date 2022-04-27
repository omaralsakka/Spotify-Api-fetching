<?php
$array = array();       
foreach(glob('jsons/*.json') as $file) {
    $result = substr($file, strpos($file, "/") + 1);
    $array[] = $result;
    
    // echo "\n";
}
echo json_encode($array);

?>