function giveGameboardTilesEventListeners(){
    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].addEventListener("click", playerChoosesTile);
    }
}

function playerChoosesTile(e){
    const selectedTileId = e.target.getAttribute("id");

    if (isPlayer1Turn && selectedTileId != "alreadyDrawTile") {
        gameBoardModule.gameboardArray.push(player1.playerSymbol);
        e.target.textContent = gameBoardModule.gameboardArray[gameBoardModule.gameboardArray.length - 1];
        e.target.setAttribute("id", "alreadyDrawTile");
        isPlayer1Turn = false;
    }else if (!isPlayer1Turn && selectedTileId != "alreadyDrawTile"){
        gameBoardModule.gameboardArray.push(player2.playerSymbol);
        e.target.textContent = gameBoardModule.gameboardArray[gameBoardModule.gameboardArray.length - 1];
        e.target.setAttribute("id", "alreadyDrawTile");
        isPlayer1Turn = true;
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

giveGameboardTilesEventListeners();