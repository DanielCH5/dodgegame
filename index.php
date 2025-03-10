<?php
// Set game id to easily change it both in the url to send highscores and showing the highscores
$gameId = getenv('GAME_ID') ?: 67;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Get from environment in production, but use a test token for development
    $apiToken = getenv('API_TOKEN') ?: '29|';

    $url = "https://highscores.martindilling.com/api/v1/games/{$gameId}/highscores";
    $data = [
        'player' => $data['player'] ?? null,
        'score' => $data['score'] ?? null,
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$apiToken}",
        'Content-Type: application/json',
        'Accept: application/json',
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        // Handle cURL execution error
        die('cURL error: ' . curl_error($ch));
    }

    // Get HTTP response status code
    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Check for HTTP errors (non-2xx status codes)
    if ($httpStatusCode < 200 || $httpStatusCode >= 300) {
        die("HTTP error occurred: Status code $httpStatusCode. Response: $response");
    }
    curl_close($ch);

    http_response_code(200);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['success' => true]);
    exit();
}

$page = $_GET['page'] ?? 'menu';

?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dodge Game</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="shortcut icon" href="heart.svg" type="image/x-icon">

</head>

<body>


    <div id="game">

        <?php if ($page === 'menu'): ?>
            <div id="menu">
                <h1 id="title">DODGE GAME</h1>
                <div id="menu-buttons">
                    <a href="/?page=game" id="start">START</a>
                    <div id="settings">
                        <a href="?page=guide">GUIDE</a>
                        <a href="?page=highscores">SCORES</a>
                    </div>
                </div>
            </div>
        <?php elseif ($page === 'game'): ?>
            <div id="scores">
                <p class="score1"></p>
                <div id="lives">
                    <img id="heart1" src="heart.svg" width="30px" alt="">
                    <img id="heart2" src="heart.svg" width="30px" alt="">
                    <img id="heart3" src="heart.svg" width="30px" alt="">
                </div>
            </div>
            <div id="game-container">

                <div id="player">

                </div>

            </div>

        <?php elseif ($page === 'guide'): ?>
            <div id="guide">
                <div class="heading">
                    <h3>GUIDE</h3>
                </div>
                <div class="guidegrids">
                    <div class="first">
                        <div class="info">
                            <p>
                                Move your character using
                            </p>
                            <div class="example">
                                <div class="movementkeys">
                                    <div>W</div>
                                    <div>A</div>
                                    <div>S</div>
                                    <div>D</div>
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <p>
                                This blue little box is you
                            </p>
                            <div class="example">
                                <div class="exampleplayer">

                                </div>
                            </div>

                        </div>

                        <div class="info">
                            <p>
                                Avoid these guys
                            </p>
                            <div class="example">
                                <div class="exampleenemy">

                                </div>
                            </div>

                        </div>


                    </div>
                    <div class="second">
                        <div class="info">
                            <p>
                                You have 3 lives
                            </p>
                            <div class="liv">
                                <img src="heart.svg" width="20px" alt="Red pixel heart">
                                <img src="heart.svg" width="20px" alt="Red pixel heart">
                                <img src="heart.svg" width="20px" alt="Red pixel heart">
                            </div>
                        </div>
                        <div class="info">
                            <p>
                                Increase your score by staying alive
                            </p>
                        </div>
                        <div class="info">
                            <p>
                                Collision = <br> <br>
                                -1<img src="heart.svg" width="20px" alt="Red pixel heart">
                            </p>

                        </div>
                    </div>




                    <div class="third">
                        <div>
                            <a href="/?page=menu">BACK</a>
                        </div>
                        <div>

                        </div>
                        <div>
                            <a href="/?page=game">START GAME</a>
                        </div>
                    </div>

                </div>
            </div>
        <?php elseif ($page === 'gameover'): ?>
            <div id="gameover">
                <div class="heading">
                    <h2>GAME OVER</h2>
                </div>

                <div class="gameover-grid">
                    <div>
                        <p>FINAL SCORE</p>
                        <p data-score1 class="score1"></p>
                        <div class="inputs">
                            <input type="text" placeholder="Enter your name here" class="submit-name-input">
                            <button class="submit-button" onclick="submitScore()">SUBMIT SCORE</button>
                        </div>
                    </div>

                    <div>
                        <iframe
                            src="https://highscores.martindilling.com/games/67/embed?fontSize=80&bgColor=111827&textColor=00ffe5&borderColor=00ffe5"
                            title="Highscore table for Dodge test" width="100%" height="100%"></iframe>
                    </div>





                </div>
            </div>

            <?php elseif ($page === 'highscores'): ?>
                <div id="highscores">
                    <div class="highscore-grid">
                        <h2>HIGHSCORES</h2>
                        <a href="?page=menu">
                            BACK
                        </a>
                    </div>
                    <div class="highscore-grid">
                    <iframe
                            src="https://highscores.martindilling.com/games/67/embed?bgColor=111827&textColor=00ffe5&borderColor=00ffe5"
                            title="Highscore table for Dodge test" width="100%" height="100%"></iframe>
                    </div>
                </div>
        <?php endif; ?>

    </div>

    <script src="game.js"></script>
</body>

</html>