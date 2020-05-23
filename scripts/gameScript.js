function giveGameboardTilesEventListeners(){
    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].addEventListener("click", playerChoosesTile);
    }
}

function giveResetButtonEventListener(){
    const RESTARTBUTTON = document.getElementById("reset-button");
    RESTARTBUTTON.addEventListener("click", restartGame);
}

function playerChoosesTile(e){
    const SELECTEDTILEID = e.target.getAttribute("id");
    
    changePlayerTextColorIfItsHisTurn(e);
    
    if (isPlayer1Turn && SELECTEDTILEID != "alreadyDrawnTile") {
        gameBoardModule.gameboardArray.push(player1.PLAYERSYMBOL);
        e.target.textContent = gameBoardModule.gameboardArray[gameBoardModule.gameboardArray.length - 1];
        e.target.setAttribute("id", "alreadyDrawnTile");
        isPlayer1Turn = false;
    }else if (!isPlayer1Turn && SELECTEDTILEID != "alreadyDrawnTile"){
        gameBoardModule.gameboardArray.push(player2.PLAYERSYMBOL);
        e.target.textContent = gameBoardModule.gameboardArray[gameBoardModule.gameboardArray.length - 1];
        e.target.setAttribute("id", "alreadyDrawnTile");
        isPlayer1Turn = true;
    }

    checkIfSomeoneWinned(e);
}

function changePlayerTextColorIfItsHisTurn(e){
    const PLAYER1TEXT = document.getElementById("p1");
    const PLAYER2TEXT = document.getElementById("p2");

    const CURRENTTILE = e.target;
    console.log(CURRENTTILE.getAttribute("id"));
    
    if (isPlayer1Turn && !someoneWinned && !CURRENTTILE.getAttribute("id")){
        PLAYER1TEXT.style.transform = "scale(1)";
        PLAYER1TEXT.style.fontWeight = "normal";
        PLAYER2TEXT.style.transform = "scale(1.025)";
        PLAYER2TEXT.style.fontWeight = "bold";

    }else if(!isPlayer1Turn && !someoneWinned && !CURRENTTILE.getAttribute("id")){
        PLAYER2TEXT.style.transform = "scale(1)";
        PLAYER2TEXT.style.fontWeight = "normal";
        PLAYER1TEXT.style.transform = "scale(1.025)";
        PLAYER1TEXT.style.fontWeight = "bold";
    }
}

function checkIfItsADraw(){
    if(gameBoardModule.gameboardArray.length == 9 && !someoneWinned && !someoneWinned){
        alert("It's a draw!");
        gameIsOver();
    }
}

function checkIfSomeoneWinned(e){

    for (let tile = 0; tile < gameboardTiles.length; tile++) {
        if(tile <= 2){//Conditional for row starting from top
            if (gameboardTiles[tile].textContent == player1.PLAYERSYMBOL){// Player is starting the row

                if (gameboardTiles[tile+3].textContent == player1.PLAYERSYMBOL && gameboardTiles[tile+6].textContent == player1.PLAYERSYMBOL && !someoneWinned){ //there's a vertical row
                    alert("Player 1 is the winner!");
                    gameIsOver();

                }else if (tile == 2){ //Conditional for row starting from the superior right
                    
                    if (gameboardTiles[tile].textContent == player1.PLAYERSYMBOL){ //Player 1
                        if (gameboardTiles[tile-1].textContent == player1.PLAYERSYMBOL && gameboardTiles[tile-2].textContent == player1.PLAYERSYMBOL && !someoneWinned) {
                            alert("Player 1 wins");
                            gameIsOver();
                        } else if(gameboardTiles[tile+2].textContent == player1.PLAYERSYMBOL && gameboardTiles[tile+4].textContent == player1.PLAYERSYMBOL && !someoneWinned){
                            alert("Player 1 wins");
                            gameIsOver();
                        }
                    }
                }else if (tile == 0){//row starting from the first tile
                    if(gameboardTiles[tile+4].textContent == player1.PLAYERSYMBOL && gameboardTiles[tile+8].textContent == player1.PLAYERSYMBOL && !someoneWinned){
                        alert("Player 1 wins");
                        gameIsOver();
                    }
                }
            }else if (gameboardTiles[tile].textContent == player2.PLAYERSYMBOL) {//Player 2

                if (gameboardTiles[tile+3].textContent == player2.PLAYERSYMBOL && gameboardTiles[tile+6].textContent == player2.PLAYERSYMBOL && !someoneWinned){
                    alert("Player 2 is the winner!");
                    gameIsOver();
                    
                }else if (tile == 2){

                    if (gameboardTiles[tile].textContent == player2.PLAYERSYMBOL){ //Player 2
                        if (gameboardTiles[tile-1].textContent == player2.PLAYERSYMBOL && gameboardTiles[tile-2].textContent == player2.PLAYERSYMBOL && !someoneWinned) {
                            alert("Player 2 wins");
                            gameIsOver();
                        } else if(gameboardTiles[tile+2].textContent == player2.PLAYERSYMBOL && gameboardTiles[tile+4].textContent == player2.PLAYERSYMBOL && !someoneWinned){
                            alert("Player 2 wins");
                            gameIsOver();
                        }
                    }
                }else if (tile == 0){//row starting from the first tile
                    if(gameboardTiles[tile+4].textContent == player2.PLAYERSYMBOL && gameboardTiles[tile+8].textContent == player2.PLAYERSYMBOL && !someoneWinned){
                        alert("Player 2 wins");
                        gameIsOver();
                    }
                }
            }

        }else if (tile == 0 || tile == 3 || tile == 6) {//Horizontal row starting from left

            if (gameboardTiles[tile].textContent == player1.PLAYERSYMBOL) { //Player 1

                if (gameboardTiles[tile+1].textContent == player1.PLAYERSYMBOL && gameboardTiles[tile+2].textContent == player1.PLAYERSYMBOL && !someoneWinned){
                    alert("Player 1 is the winner! -horizontal-");
                    gameIsOver();
                }

            }else if (gameboardTiles[tile].textContent == player2.PLAYERSYMBOL) {

                if (gameboardTiles[tile+1].textContent == player2.PLAYERSYMBOL && gameboardTiles[tile+2].textContent == player2.PLAYERSYMBOL && !someoneWinned){
                    alert("Player 2 is the winner! -horizontal-");
                    gameIsOver();
                }
            }
        }
    }
    checkIfItsADraw();
}

function restartGame(){
    someoneWinned = false;
    isPlayer1Turn = true;
    for (let i = 0; i < gameboardTiles.length; i++) {
        gameBoardModule.gameboardArray.pop();
        gameboardTiles[i].textContent = "";
        gameboardTiles[i].removeAttribute("id");
    }
}

function gameIsOver(){
    someoneWinned = true;

    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].setAttribute("id", "alreadyDrawnTile");
    }
}

let gameBoardModule = (function(){
    let gameboardArray = [];
    return {gameboardArray};
})();

const players = (name, symbol) => {
    const PLAYERNAME = name;
    const PLAYERSYMBOL = symbol;
    return{PLAYERNAME, PLAYERSYMBOL}
}

let gameboardTiles = document.querySelectorAll(".gameboard-tiles");
let player1 = players("Player 1", "x");
let player2 = players("Player 2", "o");
let isPlayer1Turn = true;
let someoneWinned = false;

giveGameboardTilesEventListeners();
giveResetButtonEventListener();