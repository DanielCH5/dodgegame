const activeKeys = {};
window.addEventListener("keydown", function (event) {
    if (Game.started) {
        activeKeys[event.key.toLowerCase()] = true; // Track pressed keys
        updateMovement();
    }
});
window.addEventListener("keyup", function (event) {
    delete activeKeys[event.key.toLowerCase()]; // Remove key from tracking
    updateMovement();
});

function updateMovement() {
    Player.movement.x = 0;
    Player.movement.y = 0;

    if (activeKeys["w"]) {
        Player.movement.y = Player.positionY > Game.top ? -3 : 0;
    }
    if (activeKeys["s"]) {
        Player.movement.y = Player.positionY < (Game.bottom - Player.height) ? 3 : 0;
    }
    if (activeKeys["a"]) {
        Player.movement.x = Player.positionX > Game.left ? -3 : 0;
    }
    if (activeKeys["d"]) {
        Player.movement.x = Player.positionX < (Game.right - Player.width) ? 3 : 0;
    }
}

const container = document.getElementById("game-container");

const boundaries = container.getBoundingClientRect();


const Game = {
    highscore: 0,
    score: 0,
    lives: 3,
    started: false,
    top: boundaries.top,
    bottom: boundaries.bottom,
    left: boundaries.left,
    right: boundaries.right,
    updateUI() {
        UI.score.textContent = this.highscore.toString();
        UI.lives.textContent = this.lives.toString();
    },

    start() {
        this.started = true;
        this.score = setInterval(() => {
            this.highscore += 500;
            this.updateUI();
        }, 500);
    },

    end() {
        this.started = false;
        clearInterval(this.score);
        enemies.forEach((enemy) => {
            enemy.removeEnemy(); // Hide enemy immediately
        });
    },

    detectCollision() {
        enemies.forEach((enemy) => {
            if (enemy.collide &&
                Player.positionX + Player.width >= enemy.positionX &&
                Player.positionX <= enemy.positionX + enemy.width &&
                Player.positionY + Player.height >= enemy.positionY &&
                Player.positionY <= enemy.positionY + enemy.height
            ) {
                Game.lives--;
                Game.updateUI();
                if (Game.lives > 0) {
                    removeAndRespawnEnemies(); // Delay enemy respawn by 0.5 seconds
                } else {
                    this.end();
                }
            }
        });
    },
};
class Enemy {
    constructor() {
        this.enemy = document.createElement('div');
        this.enemy.classList.add('enemy');
        document.body.appendChild(this.enemy);
        this.active = true;
        this.collide = true;
        this.width = 10;
        this.height = 10;

        this.resetPosition(); // Initialize enemy position and movement

        this.updatePosition();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; // Inclusive min and max
    }

    calculateMovementY() {
        return this.positionY >= ((Game.bottom + Game.top) / 2) ? -this.getRandomInt(0, 5) : this.getRandomInt(0, 5);
    }

    resetPosition() {
        const spawnLeft = this.getRandomInt(1, 2) === 1; // 50% chance to spawn on left or right

        this.positionX = spawnLeft ? Game.left : (Game.right - this.width);
        this.positionY = this.getRandomInt(Game.top, Game.bottom);

        this.movement = {
            x: spawnLeft ? this.getRandomInt(3, 7) : -this.getRandomInt(3, 7), // Move right if left spawn, left if right spawn
            y: this.calculateMovementY()
        };

        this.updatePosition();
    }

    removeEnemy() {
        this.enemy.style.display = 'none';
        this.active = false; // Hide the enemy
        this.collide = false;
    }

    respawnEnemy() {
        this.resetPosition();
        this.enemy.style.display = 'block'; // Show the enemy again after reset
        this.active = true;
        this.collide = true;
    }

    move() {
        if (Game.started && this.active) {
            this.enemy.style.display = 'block';
            this.positionX += this.movement.x;
            this.positionY += this.movement.y;

            if (this.positionX >= (Game.right - this.width) || this.positionX <= Game.left || this.positionY >= (Game.bottom - this.height)|| this.positionY <= Game.top ) {
                this.resetPosition(); // Reset when out of bounds
                return;
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
function removeAndRespawnEnemies() {
    enemies.forEach((enemy) => {
        enemy.removeEnemy(); // Hide enemy immediately
    });

    setTimeout(() => {
        enemies.forEach((enemy) => {
            enemy.respawnEnemy(); // Respawn efter 0.5 sek
        });
    }, 500);
}



const Player = {
    player: document.getElementById("player"),
    positionX: (Game.right + Game.left) / 2,
    positionY: (Game.bottom + Game.top) / 2,
    movement: { x: 0, y: 0 },
    width: 10,
    height: 10,
    move() {
        this.positionX += this.movement.x;
        this.positionY += this.movement.y;
        //Sørger for at spilleren ikke kan bevæge sig out of bounds
        if (this.positionX < boundaries.left) this.positionX = boundaries.left;
        if (this.positionX > (boundaries.right - this.width) ) this.positionX = boundaries.right - 10;
        if (this.positionY < boundaries.top) this.positionY = boundaries.top;
        if (this.positionY > (boundaries.bottom - this.height)) this.positionY = boundaries.bottom - 10;
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


const gameLoop = function () {
    Player.move();
    Player.updatePosition();
    enemies.forEach((enemy) => enemy.move());
    Game.detectCollision();
    window.requestAnimationFrame(gameLoop);
};

window.requestAnimationFrame(gameLoop);
