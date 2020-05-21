function giveGameboardTilesEventListeners(){
    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].addEventListener("click", playerChoosesTile);
    }
}

function playerChoosesTile(e){
    const selectedTileId = e.target.getAttribute("id");

    if (isPlayer1Turn && selectedTileId != "alreadyDrawnTile") {
        gameBoardModule.gameboardArray.push(player1.playerSymbol);
        e.target.textContent = gameBoardModule.gameboardArray[gameBoardModule.gameboardArray.length - 1];
        e.target.setAttribute("id", "alreadyDrawnTile");
        isPlayer1Turn = false;
    }else if (!isPlayer1Turn && selectedTileId != "alreadyDrawnTile"){
        gameBoardModule.gameboardArray.push(player2.playerSymbol);
        e.target.textContent = gameBoardModule.gameboardArray[gameBoardModule.gameboardArray.length - 1];
        e.target.setAttribute("id", "alreadyDrawnTile");
        isPlayer1Turn = true;
    }

    checkIfSomeoneWinned(e);
}

function checkIfSomeoneWinned(e){

    for (let tile = 0; tile < gameboardTiles.length; tile++) {
        if(tile <= 2){//Vertical row starting from top
            if (gameboardTiles[tile].textContent == player1.playerSymbol){// Player is starting the row

                if (gameboardTiles[tile+3].textContent == player1.playerSymbol && gameboardTiles[tile+6].textContent == player1.playerSymbol && !someoneWinned){ //there's a vertical row
                    alert("Player 1 is the winner!");
                    someoneWinned = true;
                    gameIsOver();

                }else if (tile == 2){ //Conditional for horizontal row starting from the superior right
                    
                    if (gameboardTiles[tile].textContent == player1.playerSymbol){ //Player 1
                        if (gameboardTiles[tile-1].textContent == player1.playerSymbol && gameboardTiles[tile-2].textContent == player1.playerSymbol && !someoneWinned) {
                            alert("Player 1 wins -horizontal-");
                            someoneWinned = true;
                            gameIsOver();
                        }
                    }

                }
            }else if (gameboardTiles[tile].textContent == player2.playerSymbol) {//Player 2

                if (gameboardTiles[tile+3].textContent == player2.playerSymbol && gameboardTiles[tile+6].textContent == player2.playerSymbol && !someoneWinned){
                    alert("Player 2 is the winner!");
                    someoneWinned = true;
                    gameIsOver();
                    
                }else if (tile == 2){

                    if (gameboardTiles[tile].textContent == player2.playerSymbol){ //Player 2
                        if (gameboardTiles[tile-1].textContent == player2.playerSymbol && gameboardTiles[tile-2].textContent == player2.playerSymbol && !someoneWinned) {
                            alert("Player 2 wins -horizontal-");
                            someoneWinned = true;
                            gameIsOver();
                        }
                    }

                }
            }

        }else if (tile == 0 || tile == 3 || tile == 6) {//Horizontal row starting from left

            if (gameboardTiles[tile].textContent == player1.playerSymbol) { //Player 1

                if (gameboardTiles[tile+1].textContent == player1.playerSymbol && gameboardTiles[tile+2].textContent == player1.playerSymbol && !someoneWinned){
                    alert("Player 1 is the winner! -horizontal-");
                    someoneWinned = true;
                    gameIsOver();
                }

            }else if (gameboardTiles[tile].textContent == player2.playerSymbol) {

                if (gameboardTiles[tile+1].textContent == player2.playerSymbol && gameboardTiles[tile+2].textContent == player2.playerSymbol && !someoneWinned){
                    alert("Player 2 is the winner! -horizontal-");
                    someoneWinned = true;
                    gameIsOver();
                }
                
            }
        }
    }
}
function gameIsOver(){
    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].setAttribute("id", "alreadyDrawnTile");
    }
}

let gameBoardModule = (function(){
    let gameboardArray = [];
    return {gameboardArray};
})();

const players = (name, symbol) => {
    const playerName = name;
    const playerSymbol = symbol;
    return{playerName, playerSymbol}
}

let gameboardTiles = document.querySelectorAll(".gameboard-tiles");
let player1 = players("Player 1", "x");
let player2 = players("Player 2", "o");
let isPlayer1Turn = true;
let someoneWinned = false;
giveGameboardTilesEventListeners();