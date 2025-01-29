//Player constant
const player = document.getElementById("player");


//Event listener der lytter til hvornår W,A,S,D er trykket ned og retter sig efter det ift. top position og left position i HTML
window.addEventListener("keydown", function (event) {
    if (event.key === "w" || event.key === "W") {
        let currentTop = parseInt(window.getComputedStyle(player).top);
        player.style.top = currentTop - 3 + "px";
    }
    if (event.key === "a" || event.key === "A") {
        let currentLeft = parseInt(window.getComputedStyle(player).left);
        player.style.left = currentLeft - 3 + "px";
    }
    if (event.key === "s" || event.key === "S") {
        let currentTop = parseInt(window.getComputedStyle(player).top);
        player.style.top = currentTop + 3 + "px";
    }
    if (event.key === "d" || event.key === "D") {
        let currentLeft = parseInt(window.getComputedStyle(player).left);
        player.style.left = currentLeft + 3 + "px";
    }


})