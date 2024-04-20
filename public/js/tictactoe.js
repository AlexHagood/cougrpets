function cell1Click() {
    if (document.getElementById("cell1").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell1").innerHTML = "X";
    } 
} 
function cell2Click() { 
    if (document.getElementById("cell2").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell2").innerHTML = "X"; 
    }
} 
function cell3Click() { 
    if (document.getElementById("cell3").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell3").innerHTML = "X"; 
    }
} 
function cell4Click() { 
    if (document.getElementById("cell4").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell4").innerHTML = "X"; 
    }
} 
function cell5Click() { 
    if (document.getElementById("cell5").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell5").innerHTML = "X"; 
    }
} 
function cell6Click() { 
    if (document.getElementById("cell6").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell6").innerHTML = "X"; 
    }
} 
function cell7Click() { 
    if (document.getElementById("cell7").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell7").innerHTML = "X"; 
    }
} 
function cell8Click() { 
    if (document.getElementById("cell8").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell8").innerHTML = "X"; 
    }
} 
function cell9Click() { 
    if (document.getElementById("cell9").innerHTML === "\n                <p></p>\n            "){
        document.getElementById("cell9").innerHTML = "X"; 
    }
} 

function round(){
    const board = ['_', '_', '_', '_', '_', '_', '_', '_', '_']

    board[0] = document.getElementById("cell1").innerHTML; 
    board[1] = document.getElementById("cell2").innerHTML; 
    board[2] = document.getElementById("cell3").innerHTML; 
    board[3] = document.getElementById("cell4").innerHTML; 
    board[4] = document.getElementById("cell5").innerHTML; 
    board[5] = document.getElementById("cell6").innerHTML; 
    board[6] = document.getElementById("cell7").innerHTML; 
    board[7] = document.getElementById("cell8").innerHTML; 
    board[8] = document.getElementById("cell9").innerHTML; 

    let testBtn;
    testBtn = document.getElementById("reset");
    for (let i = 0; i < 9; i++){
        if (board[i] === "\n                <p></p>\n            "){
            board[i] = '_';
        }
    }

    let winner = victory(board);

    if(countBlank(board) === 0 && winner == 'T'){
        document.getElementById("outcome").innerHTML = "It was a tie";
        testBtn.disabled = false;
    }

    else if(winner === 'X' || winner === 'O'){
        let text = `${winner} won!`;
        document.getElementById("outcome").innerHTML = text;
        testBtn.disabled = false;
    }

    let oIndex = -1;
    if (countBlank(board) == 8) {
        console.log("first turn")
    }
    console.log("board blanks: ", countBlank(board))
    const newBoard = minimax(board);
    for (let i = 0; i < 9; i++){
        if (board[i] !== newBoard[i]){
            oIndex = i + 1;
            break;
        }
    }

    let oCell = `cell${oIndex}`;
    //console.log(oCell);
    document.getElementById(oCell).innerHTML = 'O';

    winner = victory(newBoard);

    if(winner === 'X' || winner === 'O'){
        let text = `${winner} won!`;
        document.getElementById("outcome").innerHTML = text;
        testBtn.disabled = false;
    }
}

function victory(board){
    let winner = '';
    for (let i = 0; i < 3; i++){
        if (board[3*i] === board[3*i+1] && board[3*i+1] === board[3*i+2] && board[3*i] !== '_'){
            winner = board[3*i]
            // let text = `${winner} won!`;
            // document.getElementById("outcome").innerHTML = text;
            return board[3*i]
        }
        else if (board[i] === board[3+i] && board[3+i] === board[6+i] && board[i] !== '_'){
            winner =  board[i];
            return board[i]
        }
    }

    if (board[0] === board[4] && board[4] === board[8] && board[0] !== '_'){
        winner =  board[0];
        // let text = `${winner} won!`;
        // document.getElementById("outcome").innerHTML = text;
        return board[0]
    }

    else if (board[2] === board[4] && board[4] === board[6] && board[2] !== '_'){
        winner =  board[2];
        // let text = `${winner} won!`;
        // document.getElementById("outcome").innerHTML = text;
        return board[2]
    }

    else{
        return 'T';
    }
}

function victoryScore(victor){
    if (victor === 'O'){
        return 1;
    }
    else if (victor === 'X'){
        return -1;
    }
    else{
        return 0;
    }
}

function minimax(board){
    if (victory(board) !== 'T'){
        return board;
    }
    const move = maxValue(board)[1]
    //console.log(move)
    return move;
}

function genChildren(char, board){
    let childList = [];
    for (let i = 0; i < 9; i++){
        let child = [];
        for (let j = 0; j < 9; j++){
            child.push(board[j]);
        }
        if (board[i] === '_'){
            child[i] = char;
            childList.push(child);
        }
    }
    return childList
}

function maxValue(board){
    if (countBlank(board) === 0){
        return [victoryScore(victory(board)), board];
    }
    else if(victory(board) !== 'T'){
        return [victoryScore(victory(board)), board];
    }
    let playList = [];
    let score = -1 * Infinity;
    let maxBoard = board;
    playList = genChildren('O', board);
    for (let i = 0; i < playList.length; i++){
        let plays = playList[i];
        let childScore = minValue(plays)[0];
        //console.log(score, childScore, score < childScore)
        if (score < childScore){
            score = childScore;
            maxBoard = plays;
        }
    }
    //console.log(score, maxBoard)
    return [score, maxBoard];
}

function minValue(board){
    if (countBlank(board) === 0){
        return [victoryScore(victory(board)), board];
    }
    else if(victory(board) !== 'T'){
        return [victoryScore(victory(board)), board];
    }
    let playList = [];
    let score = Infinity;
    let minBoard = board;
    playList = genChildren('X', board);
    for (let i = 0; i < playList.length; i++){
        //console.log(i)
        let plays = playList[i];
        //console.log(playList.length)
        //console.log(plays)
        let childScore = maxValue(plays)[0];
        //console.log(plays)
        //console.log(score, childScore, score > childScore)
        if (score > childScore){
            score = childScore;
            minBoard = plays;
        }
    }
    return [score, minBoard];
}

function countBlank(board){
    let numBlank = 0;
    for (let i = 0; i < 9; i++){
        if(board[i] === '_'){
            numBlank++;
        }
    }
    return numBlank;
}

function reset(){
    document.getElementById("cell1").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell2").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell3").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell4").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell5").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell6").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell7").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell8").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("cell9").innerHTML = "\n                <p></p>\n            ";
    document.getElementById("outcome").innerHTML = "\n                <p></p>\n            ";
}