//Player constant
const player = document.getElementById("player");

let position = {
    x: parseInt(window.getComputedStyle(player).left),
    y: parseInt(window.getComputedStyle(player).top),
};
let movement = {x: 0, y: 0};

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


const gameLoop = function() {
    position.x += movement.x;
    position.y += movement.y;

    player.style.left = position.x + 'px';
    player.style.top = position.y + 'px';

    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);