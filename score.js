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

                if (this.lives <= 0 ) {
                    this.end();
                }
            }, 1000);
    },

    end() {
        this.started = false;
        this.updateUI;
        clearInterval(this.score);
        

    }

}

