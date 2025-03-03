<?php

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
    <div id="scores">
        <p id="score--value"></p>
        <p id="lives"></p>
        <!--<div class="container">
            <div data-player1 class="player1"></div>
            <div data-score1 class="score1"></div>
            <button data-send-button class="send-button">Send</button>
            <pre data-response-preview class="response-preview"></pre>
        </div>-->
    </div>

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


                    </div>

                </div>
            </div>
        <?php endif; ?>

    </div>
    <script>
        const playerElement = document.querySelector('[data-player1]');
        const scoreElement = document.querySelector('[data-score1]');
        const sendButton = document.querySelector('[data-send-button]');
        const responsePreviewElement = document.querySelector('[data-response-preview]');

        function generatePirateName() {
            const firstNames = ["Blackbeard", "Salty", "One-Eyed", "Mad", "Captain", "Peg-Leg", "Red", "Stormy", "Jolly", "Barnacle"];
            const lastNames = ["McScurvy", "Silverhook", "Rumbelly", "Seadog", "Plankwalker", "Bones", "Squidbeard", "Driftwood", "Sharkbait", "Bootstraps"];

            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

            return `${randomFirstName} ${randomLastName}`;
        }
        const player1 = generatePirateName();
        const score1 = Math.round(Math.random() * 1000);

        playerElement.textContent = player1;
        scoreElement.textContent = score1.toString();
        sendButton.addEventListener('click', () => {
            fetch(
                'submit-highscore.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        player1: player1,
                        score1: score1,
                    }),
                }
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    responsePreviewElement.textContent = JSON.stringify(data, null, 2);
                })
                .catch(function (error) {
                    console.error(error);
                    responsePreviewElement.textContent = JSON.stringify(error, null, 2);
                });
        });
    </script>
    <script src="game.js"></script>
</body>

</html>