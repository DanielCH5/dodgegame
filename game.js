class Enemy {
    constructor() {
        this.enemy = document.createElement('div');
        this.enemy.classList.add('enemy');
        document.body.appendChild(this.enemy);

        this.positionX = 250;
        this.positionY = this.getRandomInt(100, 500);
        this.movement = { x: this.getRandomInt(1, 10), y: this.getRandomInt(1,10) }; // Random speed between 1 and 10
        this.width = 10;
        this.height = 10;

        this.updatePosition();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // Inclusive min and max
    }

    move() {
        if (Game.started) {
            this.enemy.style.display = 'block';
            this.positionX += this.movement.x;
            this.positionY += this.movement.y;

            if (this.positionX >= 1040) {
                this.movement.x = -this.getRandomInt(1, 10); // Random speed when changing direction
            }
            if (this.positionX <= 250) {
                this.movement.x = this.getRandomInt(1, 10);
            }
            if (this.positionY >= 500) {
                this.movement.y = -this.getRandomInt(1, 10); // Random speed when changing direction
            }
            if (this.positionY <= 100) {
                this.movement.y = this.getRandomInt(1, 10);
            }

            this.updatePosition();
        }
    }

    updatePosition() {
        this.enemy.style.position = 'absolute';
        this.enemy.style.left = this.positionX + 'px';
        this.enemy.style.top = this.positionY + 'px';
    }
}

// Create multiple enemies
const enemies = [];
for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
}

const Player = {
    player: document.getElementById("player"),
    positionX: 650,
    positionY: 295,
    movement: { x: 0, y: 0 },
    width: 10,
    height: 10,

    move() {
        this.positionX += this.movement.x;
        this.positionY += this.movement.y;

        if (Game.started) {
            window.addEventListener("keydown", function (event) {
                if (event.key === "w" || event.key === "W") {
                    Player.movement.y = Player.positionY > 100 ? -3 : 0;
                }
                if (event.key === "a" || event.key === "A") {
                    Player.movement.x = Player.positionX > 250 ? -3 : 0;
                }
                if (event.key === "s" || event.key === "S") {
                    Player.movement.y = Player.positionY < 490 ? 3 : 0;
                }
                if (event.key === "d" || event.key === "D") {
                    Player.movement.x = Player.positionX < 1040 ? 3 : 0;
                }
            });
        }
    },

    stopMove() {
        window.addEventListener("keyup", function (event) {
            if (["w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) {
                Player.movement.x = 0;
                Player.movement.y = 0;
            }
        });
    },

    updatePosition() {
        this.player.style.left = this.positionX + "px";
        this.player.style.top = this.positionY + "px";
    },
};

const UI = {
    score: document.querySelector("#score--value"),
    lives: document.querySelector("#lives"),
};

const Game = {
    highscore: 0,
    score: 0,
    lives: 3,
    started: false,

    updateUI() {
        UI.score.textContent = this.highscore.toString();
        UI.lives.textContent = this.lives.toString();
    },

    start() {
        this.started = true;
        this.score = setInterval(() => {
            this.highscore += 1000;
            this.updateUI();
        }, 1000);
    },

    end() {
        this.started = false;
        clearInterval(this.score);
    },

    detectCollision() {
        enemies.forEach((enemy) => {
            if (
                Player.positionX + Player.width >= enemy.positionX &&
                Player.positionX <= enemy.positionX + enemy.width &&
                Player.positionY + Player.height >= enemy.positionY &&
                Player.positionY <= enemy.positionY + enemy.height
            ) {
                Game.lives--;
                Game.updateUI();
                if (this.lives <= 0) {
                this.end();
            }
            }
        });
    },
};

// **Game Loop**
const gameLoop = function () {
    Player.move();
    Player.stopMove();
    Player.updatePosition();

    enemies.forEach((enemy) => enemy.move());

    Game.detectCollision();

    window.requestAnimationFrame(gameLoop);
};

// **Start the game loop**
window.requestAnimationFrame(gameLoop);
