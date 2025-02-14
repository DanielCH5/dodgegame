//Tager fat i score


/*function gameStart(){
    let start = Date.now();

    setInterval(function(){
        document.getElementById("score").innerHTML = Date.now() - start;

    }, 1000);  
    
}*/


const UI = {
    timer: document.querySelector('.timer--value'),
    score: document.querySelector('#score--value'),
    gameOverOverlay: document.querySelector('.game-over-overlay'),
    gameOverScore: document.querySelector('.game-over-score'),
    nameInput: document.querySelector('.submit-name-input'),
    submitButton: document.querySelector('.submit-button'),
    exitButton: document.querySelector('.exit-button'),
    message: document.querySelector('.status-message'),
    cells: document.querySelectorAll('.cell'),

};
const enemy = document.getElementById("enemy");

const enemyPosition = {
    X: parseInt(window.getComputedStyle(enemy).left),
    Y: parseInt(window.getComputedStyle(enemy).top),
}

const enemyMovement = { x: 0, y: 0 };

const Game = {
    highscore: null,
    score: 0,
    lives: 3,
    started: false,
    fjendeposition: null,

    updateUI() {
        UI.score.textContent = this.calculateScore().toString();
    },
    updatePosition() {
        let enemy = document.getElementById("enemy");
        enemy.style.left = enemyPosition.X += 'px';
    },
    calculateScore() {
        return this.highscore;
    },
    calculatePosition() {
        return this.fjendeposition;
    },

    start() {
        this.started = true;
        this.score =
            setInterval(() => {
                this.highscore += 1000;
                this.updateUI();

                if (this.lives <= 0) {
                    this.end();
                }
            }, 1000);
        this.enemyMovement();
    },

    end() {
        this.started = false;
        this.updateUI;
        clearInterval(this.score);


    },

    enemyMovement() {
        this.fjendeposition =
            setInterval(() => {
                enemyPosition.X += 500;
                this.updatePosition();

            }, 1000);
        

    },

};

//Player constant
const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
let positionPlayer = {
    x: parseInt(window.getComputedStyle(player).left),
    y: parseInt(window.getComputedStyle(player).top),
};

let movement = { x: 0, y: 0 };

//Event listener der lytter til hvornår W,A,S,D er trykket ned og retter sig efter det ift. top position og left position i HTML
window.addEventListener("keydown", function (event) {
    if (event.key === "w" || event.key === "W") {
        movement.y = -1;
    }
    if (event.key === "a" || event.key === "A") {
        movement.x = -1;
    }
    if (event.key === "s" || event.key === "S") {
        movement.y = 1;
    }
    if (event.key === "d" || event.key === "D") {
        movement.x = 1;
    }
});
window.addEventListener("keyup", function (event) {
    if (event.key === "w" || event.key === "W") {
        movement.y = 0;
    }
    if (event.key === "a" || event.key === "A") {
        movement.x = 0;
    }
    if (event.key === "s" || event.key === "S") {
        movement.y = 0;
    }
    if (event.key === "d" || event.key === "D") {
        movement.x = 0;
    }
});


const gameLoop = function () {
    positionPlayer.x += movement.x;
    positionPlayer.y += movement.y;

    player.style.left = positionPlayer.x + 'px';
    player.style.top = positionPlayer.y + 'px';



    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);