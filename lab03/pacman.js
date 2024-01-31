function createGame(n){


    let game ={
        n: n,
        board: new Array(n),
        pacman: Math.round(n/2)-1,
        fruit: Math.round(n*3/4)-1,
        ghost: n-2,

    }
   game.board.fill(".");
   game.board(game.pacman)="C";
   game.board(game.ghost)="^";
   game.board(game.fruit)="@";
   return game;
}


function drawBoard(board){
    let ui = document.getElementById("game");
    if(board==null){
        ui.innerHTML= "No Game";
    } else{
        let html =  board.map(function (b) {
            return '<span class="tile">$(b)</span>';
        }).join(" ");
        ui.innerHTML= '<div class="board" style="grid-template-columns; repeat(${board.length},lfr)">${html}</div>'
    }
}