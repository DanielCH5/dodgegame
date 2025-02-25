/*class Car {
    constructor(brand, price) {
            this.brand = brand;
            this.color = ["Red", "Blue", "Green"];
            this.price = price;
            this.currency = 'BTC';
            this.rate = 685140.06;
    }

    getPriceInDKK() {
        const price = this.price;
        const rate = this.rate;
        const priceInDkk = price * rate;

        return priceInDkk + ' DKK';
    }
}*/
const Enemy = {
    enemy: document.querySelector('.enemy'),
    positionX: 500,
    positionY: 295,
    movement: { x: 10, y: 0 },
    width: 10,
    height: 10,
    move() {

        if (Game.started) {

            Enemy.enemy.style.display = 'block';


            this.positionX += this.movement.x;
            this.positionY += this.movement.y;
            if (this.positionX >= 1390) {
                this.movement.x = -10;
            }
            if (this.positionX <= 500) {
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
    width: 10,
    height: 10,

    //Event listener der lytter til hvornår W,A,S,D er trykket ned og retter sig efter det ift. top position og left position i HTML

    move() {



        this.positionX += this.movement.x;
        this.positionY += this.movement.y;

        if (Game.started === true) {

            window.addEventListener("keydown", function (event) {
                if (event.key === "w" || event.key === "W") {
                    if(Player.positionY >= 200){
                        Player.movement.y = -3;
                    }else{
                        Player.movement.y = 0;
                    }
                }
                if (event.key === "a" || event.key === "A") {
                    if(Player.positionX >= 500){
                        Player.movement.x = -3;
                    } else{
                        Player.movement.x = 0;
                    }
                }
                if (event.key === "s" || event.key === "S") {
                    if(Player.positionY <= 690){
                        Player.movement.y = 3;
                    } else{
                        Player.movement.y = 0;
                    }
                    
                }
                if (event.key === "d" || event.key === "D") {
                    if(Player.positionX <= 1390){
                        Player.movement.x = 3;
                    } else{
                        Player.movement.x = 0;
                    }
                    
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
    lives: document.querySelector('#lives'),
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
        UI.lives.textContent = this.calculateLives().toString();
    },

    calculateLives(){
        return this.lives;
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
    detectCollision(){
        if(
            Player.positionX + Player.width >= Enemy.positionX &&
            Player.positionX <= Enemy.positionX + Enemy.width &&
            Player.positionY + Player.height >= Enemy.positionY &&
            Player.positionY <= Enemy.positionY + Enemy.height
        ){
            Game.lives--;
        }
    }
};

const gameContainer = document.getElementById("game-container");


const gameLoop = function () {
    Player.move();
    Player.stopMove();
    Player.updatePosition();
    Enemy.move();
    Enemy.updatePosition();
    Game.detectCollision();
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);