# Dodge Game

A retro, bullet-hell-style browser game. You control a small blue box and try to survive as long as possible while enemies fly across the screen from the left and right. When the game ends you can submit your score to an online highscore table.

This is a school project made by me!

## How to play

- Move with **W A S D**
- You have **3 lives**. Each collision with an enemy costs one heart.
- Your score goes up the longer you stay alive (500 points every half second).
- Enemies speed up as your score climbs, starting at 2,500 points and getting faster at each milestone up to 50,000.
- After losing your last life, enter your name on the Game Over screen to submit your score.

## Features

- Main menu with Start, Guide and Scores
- A guide page explaining the controls and rules
- Smooth movement and collision detection using `requestAnimationFrame`
- Five enemies that spawn on random sides with random vertical angles, and respawn briefly after you're hit
- Difficulty that ramps up with your score
- Online highscores through the [highscores.martindilling.com](https://highscores.martindilling.com) API, shown in an embedded table
- Pixel-art look with the *Press Start 2P* font and pixel heart icons

## Tech stack

| Part | Technology |
|---|---|
| Game logic | Vanilla JavaScript |
| Pages & highscore submission | PHP 8.2 |
| Styling | CSS |
| Local environment | Docker Compose (PHP + Apache) |
| Highscores | External REST API (highscores.martindilling.com) |

## Project structure

```
dodgegame/
├── index.php               # All pages (menu, game, guide, game over, highscores) + score submission
├── game.js                 # Game loop, player movement, enemies, collisions, scoring
├── styles.css              # Layout and retro styling
├── api.php                 # Small cURL helper for calling the highscore API
├── create-game.php         # One-off script: registers the game with the highscore API
├── delete-game.php         # One-off script: deletes a game from the highscore API
├── submit-highscore.php    # Standalone score-submission endpoint (earlier version)
├── heart.svg, emptyheart.svg, heart1.png
├── PressStart2P-Regular.ttf
├── Dockerfile
└── docker-compose.yml
```

## How it works

`index.php` serves every screen, picking which one to show from the `?page=` query parameter (`menu`, `game`, `guide`, `gameover`, `highscores`).

On the game page, `game.js` starts the score counter after a short 2-second delay and runs the game loop. When you lose your last life, the final score is saved in `sessionStorage` and you're sent to the Game Over screen.

Submitting your score sends a `POST` request to `index.php`, which forwards the player name and score to the highscore API using a bearer token. You're then taken to the highscores page, which embeds the game's live leaderboard.

## Running it locally

### Prerequisites

- Docker and Docker Compose

### Start the game

```bash
docker compose up --build
```

Then open http://localhost.

The game itself works without any further setup. Submitting scores needs an API token for the highscore service.

### Highscore configuration

`index.php` reads two environment variables:

| Variable | Purpose | Default |
|---|---|---|
| `API_TOKEN` | Bearer token for the highscore API | none |
| `GAME_ID` | The game's ID on the highscore service | `67` |

You can add them to the `php` service in `docker-compose.yml`:

```yaml
    environment:
      API_TOKEN: your_token_here
      GAME_ID: 67
```

The helper scripts (`create-game.php`, `delete-game.php`, `submit-highscore.php`) instead read the token from a `config.php` file, which is git-ignored. Create it in the project root if you want to use them:

```php
<?php
return [
    'api_token' => 'your_token_here',
];
```

`docker-compose.yml` also starts MySQL and phpMyAdmin (http://localhost:8080), but the game doesn't currently use a database.
