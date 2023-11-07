<?php


$searchTerm = $_GET['searchTerm'];

if (empty($searchTerm)) {
    echo json_encode([]); 
} else {
    $jsonData = file_get_contents('rocks.json');
    $rocksData = json_decode($jsonData, true);

    $matchingRocks = [];

    foreach ($rocksData as $rock) {
        if (stripos($rock['RockName'], $searchTerm) !== false) {
            $matchingRocks[] = $rock;
        }
    }

    echo json_encode($matchingRocks);
}
?>
