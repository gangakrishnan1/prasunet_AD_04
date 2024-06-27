let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
    });

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetGame);
});

function handleCellClick(event) {
    if (gameOver) return;

    const cellId = event.target.id;
    const [row, col] = cellId.split('-').slice(1).map(Number);

    if (gameBoard[row][col] === '') {
        gameBoard[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkForWin()) {
            gameOver = true;
            alert(`${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            gameOver = true;
            alert("It's a draw!");
        } else {
            switchPlayer();
        }
    }
}

function checkForWin() {
    // Check horizontal and vertical wins
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) {
            return true;
        }
        if (gameBoard[0][i] === currentPlayer && gameBoard[1][i] === currentPlayer && gameBoard[2][i] === currentPlayer) {
            return true;
        }
    }

    // Check diagonal wins
    if (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) {
        return true;
    }
    if (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer) {
        return true;
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(row => row.every(cell => cell !== ''));
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
