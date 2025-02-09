//Tager fat i score


function gameStart(){
    let start = Date.now();

    setInterval(function(){
        document.getElementById("score").innerHTML = Date.now() - start;

    }, 1000);  
    
}
