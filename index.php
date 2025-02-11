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
        <button id="stopButton" onclick="Game.end()">Stop</button>
    </div>
    <div id="game">

        <div id="player">

        </div>

        <div id="enemy">
            
        </div>
    </div>

    <script src="movement.js"></script>
    <script src="score.js"></script>
</body>

</html>