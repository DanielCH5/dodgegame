

const UI = {
    score: document.querySelector(".score1"),
    heart1: document.querySelector("#heart1"),
    heart2: document.querySelector("#heart2"),
    heart3: document.querySelector("#heart3"),
    nameInput: document.querySelector('.submit-name-input'),
    submitButton: document.querySelector('.submit-button'),

};
const activeKeys = {};

function submitScore() {
    fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            player: UI.nameInput.value,
            score: sessionStorage.getItem("finalScore"),
        }),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to submit score');
            return response.json();
        })
        .then(() => (window.location.href = '/?page=highscores'))
        .catch((error) => {
            console.error(error);
        });
        sessionStorage.removeItem("finalScore");

};
if (sessionStorage.getItem("finalScore")) {
    UI.score.textContent = sessionStorage.getItem("finalScore");
};
const container = document.querySelector("#game-container");

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
    endScore: null,
    updateUI() {
        UI.score.textContent = this.highscore.toString();
        if(this.lives === 2){
            UI.heart3.remove();
        };

        if(this.lives === 1){
            UI.heart2.remove();
        };
    },

    start() {
        if (container !== null) {
            setTimeout(() => {
                this.started = true;
                this.score = setInterval(() => {
                    this.highscore += 500;
                    this.updateUI();
                }, 500);
            }, 2000);
        }
    },

    end() {
        this.started = false;
        sessionStorage.setItem("finalScore", this.highscore);
        clearInterval(this.score);
        enemies.forEach((enemy) => {
            enemy.removeEnemy(); // Hide enemy immediately
        });
        window.location.href = "/?page=gameover";

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
        this.width = 15;
        this.height = 15;

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
            x: spawnLeft ? this.getRandomInt(3, 10) : -this.getRandomInt(3, 10), // Move right if left spawn, left if right spawn
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

            if (this.positionX >= (Game.right - this.width) || this.positionX <= Game.left || this.positionY >= (Game.bottom - this.height) || this.positionY <= Game.top) {
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
        if (this.positionX > (boundaries.right - this.width)) this.positionX = (boundaries.right - Player.width);
        if (this.positionY < boundaries.top) this.positionY = boundaries.top;
        if (this.positionY > (boundaries.bottom - this.height)) this.positionY = (boundaries.bottom - Player.height);
    },



    updatePosition() {
        this.player.style.left = this.positionX + "px";
        this.player.style.top = this.positionY + "px";
    },
};



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





const gameLoop = function () {
    Player.move();
    Player.updatePosition();
    enemies.forEach((enemy) => enemy.move());
    Game.detectCollision();
    window.requestAnimationFrame(gameLoop);
};
Game.start();
window.requestAnimationFrame(gameLoop);
