<?php
session_start();

// Vérifie si l'appel provient de la méthode POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['start_game'])) {
        startNewGame();
    }
    elseif (isset($_POST['score'])) {
        updateScore($_POST['score']);
    }

    elseif (isset($_POST['highest_score'])) {
        updateHighestScore($_POST['highest_score']);
    }
}

// Fonction pour démarrer un nouveau jeu
function startNewGame() {
    $_SESSION['snake_game'] = array(
        'score' => 0,
    );
    echo json_encode(array('status' => 'success', 'message' => 'New game started'));
}

// Fonction pour mettre à jour le score
function updateScore($score) {
    $_SESSION['snake_game']['score'] = $score;
    echo json_encode(array('status' => 'success', 'message' => 'Score updated'));
}

// Fonction pour mettre à jour le meilleur score
function updateHighestScore($highestScore) {
    $_SESSION['highest_score'] = $highestScore;
    echo json_encode(array('status' => 'success', 'message' => 'Highest score updated'));
}

?>
