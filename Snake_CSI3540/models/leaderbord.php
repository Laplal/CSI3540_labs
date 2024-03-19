<?php
session_start();

// Initialize game state if not set
if (!isset($_SESSION['snake_game'])) {
    $_SESSION['snake_game'] = [
        'snake' => [[ 'x' => 10, 'y' => 10 ]],
        'apples' => [],
        'direction' => 'right',
        'score' => 0,
        'highest_score' => isset($_SESSION['highest_score']) ? $_SESSION['highest_score'] : 0,
    ];
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $score = $_SESSION['snake_game']['score'];
    $highestScore = $_SESSION['snake_game']['highest_score'];
    

    $applesEaten = count($_SESSION['snake_game']['apples_eaten']);
    $score += $applesEaten;
    $_SESSION['snake_game']['score'] = $score;
    
  
    if ($score > $highestScore) {
        $_SESSION['snake_game']['highest_score'] = $score;
        $highestScore = $score;
    }
    
    // Update ranking
    $ranking = isset($_SESSION['ranking']) ? $_SESSION['ranking'] : [];
    $player = ['score' => $score];
    array_push($ranking, $player);
    usort($ranking, function($a, $b) {
        return $b['score'] - $a['score'];
    });
    $_SESSION['ranking'] = array_slice($ranking, 0, 10); // Keep only top 10 scores
    
    // Return updated score and ranking
    echo json_encode(['score' => $score, 'highest_score' => $highestScore, 'ranking' => $_SESSION['ranking']]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['highest_score' => $_SESSION['snake_game']['highest_score'], 'ranking' => $_SESSION['ranking']]);
}
?>