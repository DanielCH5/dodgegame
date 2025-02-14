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
if (!$data || !isset($data['player'], $data['score'])) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON data. Must have the keys "player" and "score".',
    ], JSON_THROW_ON_ERROR);
    exit;
}

// Validate player name.
$player = trim($data['player']);
if (empty($player) || strlen($player) < 2 || strlen($player) > 50) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid player name. Must be minimum of 2 characters and maximum 50 characters.',
    ], JSON_THROW_ON_ERROR);
    exit;
}

// Validate score.
$score = (int) $data['score'];
if ($score <= 0) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid score. Must be greater than 0.',
    ], JSON_THROW_ON_ERROR);
    exit;
}

// Send score to highscore api.
$url = 'https://highscores.martindilling.com/api/v1/games/12/highscores';
$payload = [
    'player' => $player,
    'score' => $score,
];
$response = apiPost($url, $payload);

echo json_encode([
    'success' => 'The score was submitted',
], JSON_THROW_ON_ERROR);