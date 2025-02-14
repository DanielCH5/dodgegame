<?php
    $token = '18|t01aLZmyJBJdJwXPszy27OtgC0XpnXIQAwnleRCx53d45f08';
    $url = 'https://highscores.martindilling.com/api/v1/games';
    $headers = [
        'Accept: application/json',
        'Content-type: application/json',
        'Authorization: Bearer ' . $token,
    ];

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
    ]);
    $responseData = curl_exec($curl);
    curl_close($curl);

    $responseJson = json_decode($responseData);
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
        <button id="startButton" onclick="Game.start()">Start</button>
        <button data-send-button class="send-button" id="stopButton" onclick="Game.end()">Stop</button>
    </div>
    <div id="game">

        <div id="game-container">
            <div id="player">

            </div>

            <div id="enemy">

            </div>
        </div>


    </div>
    <script>
        const playerElement = document.querySelector('[data-player]');
        const scoreElement = document.querySelector('[data-score]');
        const sendButton = document.querySelector('[data-send-button]');
        const responsePreviewElement = document.querySelector('[data-response-preview]');
        sendButton.addEventListener('click', () => {
            fetch(
                'submit-highscore.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        player: player,
                        score: score,
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
                .catch(function (error){
                    console.error(error);
                    responsePreviewElement.textContent = JSON.stringify(error, null, 2);
                });
        });
    </script>
    <script src="game.js"></script>
</body>

</html>