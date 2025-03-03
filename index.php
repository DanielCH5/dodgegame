<?php
// Set game id to easily change it both in the url to send highscores and showing the highscores
$gameId = getenv('GAME_ID') ?: 63;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Get from environment in production, but use a test token for development
    $apiToken = getenv('API_TOKEN') ?: '27|SmleWwD2EOu903blOpkE5or2LO2U5QmJ3oedqjz24a8425d2';

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
                        <a href="">SCORES</a>
                    </div>
                </div>
            </div>
        <?php elseif ($page === 'game'): ?>
            <div id="scores">
                <p class="score1"></p>
                <p id="lives"></p>
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
                                This black little box is you
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
                                -1<img src="heart.svg" width="20px" alt="">
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
                        <div>
                            <input type="text" placeholder="Enter your name here" class="submit-name-input">
                            <button class="submit-button" onclick="submitScore()">Submit</button>
                            <pre data-response-preview class="response-preview"></pre>
                        </div>
                    </div>

                    <div>
                        <iframe
                            src="https://highscores.martindilling.com/games/63/embed?fontSize=80&bgColor=111827&textColor=59cf8f&borderColor=3f485b"
                            title="Highscore table for Dodge test" width="100%" height="100%"></iframe>
                    </div>





                </div>
            </div>
        <?php endif; ?>

    </div>

    <script src="game.js"></script>
</body>

</html>