const Enemy = {
    enemy: document.querySelector('.enemy'),
    positionX: 0,
    positionY: 0,
    movement: { x: 10, y: 0 },
    move() {

        if (Game.started) {


            this.positionX += this.movement.x;
            this.positionY += this.movement.y;
            if (this.positionX > window.screen.width) {
                this.movement.x = -10;
            }
            if (this.positionX < 0) {
                this.movement.x = 10;
            }
        }
    },
    updatePosition() {
        this.enemy.style.left = this.positionX + 'px';
    },



};
const Player = {
    player: document.getElementById("player"),
    positionX: parseInt(window.getComputedStyle(this.player).left),
    positionY: parseInt(window.getComputedStyle(this.player).top),
    movement: { x: 0, y: 0 },

    //Event listener der lytter til hvornår W,A,S,D er trykket ned og retter sig efter det ift. top position og left position i HTML

    move() {



        this.positionX += this.movement.x;
        this.positionY += this.movement.y;

        if (Game.started === true) {
            window.addEventListener("keydown", function (event) {
                if (event.key === "w" || event.key === "W") {
                    Player.movement.y = -3;
                }
                if (event.key === "a" || event.key === "A") {
                    Player.movement.x = -3;
                }
                if (event.key === "s" || event.key === "S") {
                    Player.movement.y = 3;
                }
                if (event.key === "d" || event.key === "D") {
                    Player.movement.x = 3;
                }
            });
        } 

    },

    stopMove() {
        window.addEventListener("keyup", function (event) {
            if (event.key === "w" || event.key === "W") {
                Player.movement.y = 0;
            }
            if (event.key === "a" || event.key === "A") {
                Player.movement.x = 0;
            }
            if (event.key === "s" || event.key === "S") {
                Player.movement.y = 0;
            }
            if (event.key === "d" || event.key === "D") {
                Player.movement.x = 0;
            }
        });
    },
    updatePosition() {
        this.player.style.left = this.positionX + 'px';
        this.player.style.top = this.positionY + 'px';
    },




}




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

const Game = {
    highscore: null,
    score: 0,
    lives: 3,
    started: false,
    updateUI() {
        UI.score.textContent = this.calculateScore().toString();
    },

    calculateScore() {
        return this.highscore;
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
    },

    end() {
        this.started = false;
        this.updateUI;
        clearInterval(this.score);


    },
};

const gameContainer = document.getElementById("game-container");


const gameLoop = function () {
    Player.move();
    Player.stopMove();
    Player.updatePosition();
    Enemy.move();
    Enemy.updatePosition();
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);