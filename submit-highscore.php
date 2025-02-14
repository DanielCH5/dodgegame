<?php

require_once __DIR__ . '/api.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method',
    ], JSON_THROW_ON_ERROR);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate json format.
if (!$data || !isset($data['player1'], $data['score1'])) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON data. Must have the keys "player" and "score".',
    ], JSON_THROW_ON_ERROR);
    exit;
}

// Validate player name.
$player1 = trim($data['player1']);
if (empty($player1) || strlen($player1) < 2 || strlen($player1) > 50) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid player name. Must be minimum of 2 characters and maximum 50 characters.',
    ], JSON_THROW_ON_ERROR);
    exit;
}

// Validate score1.
$score1 = (int) $data['score1'];
if ($score1 <= 0) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid score. Must be greater than 0.',
    ], JSON_THROW_ON_ERROR);
    exit;
}

// Send score to highscore api.
$url = 'https://highscores.martindilling.com/api/v1/games/41/highscores';
$payload = [
    'player' => $player1,
    'score' => $score1,
];
$response = apiPost($url, $payload);

echo json_encode([
    'success' => 'The score was submitted',
], JSON_THROW_ON_ERROR);