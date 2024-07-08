
const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#resetButton");

const win = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];


let choices = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false; 

startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    resetButton.addEventListener("click", restartgame)
    status.textContent = `${currentPlayer}'s turn`
    running = true;

}

function cellClicked() {
    const cellIndex = this.getAttribute("Index");
    if (choices[cellIndex] !== "" || !running) {
        return;
    }
    else {
        cellUpdate(this, cellIndex);  
        checkWinner();
    }

}
function cellUpdate(cell, index) {
    choices[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    status.textContent = `${currentPlayer}'s turn`;

}
function checkWinner() {
    let Won = false;

    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const cellA = choices[condition[0]];
        const cellB = choices[condition[1]];
        const cellC = choices[condition[2 ]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue 
        }

        if (cellA ===  cellB && cellB === cellC) {
            Won = true;
            break;
        }
    }
    if (Won) {
        status.textContent = `${currentPlayer} wins`
        running = false;
    }
    else if (!choices.includes("")) {
        status.textContent = "Draw!";
        running = false;
        }
        else {
            changePlayer();
        }

}

function restartgame() {
    cells.forEach(cell =>  
    cell.textContent = ""
    )
    currentPlayer = "X";
    choices = ["", "", "", "", "", "", "", "", ""];
    status.textContent = `${currentPlayer}'s turn`;
    running = true;

}