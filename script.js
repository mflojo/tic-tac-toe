document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll(".cell");
    const game = PlayGame(); 
    game.startGame(); 

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            const [row, col] = e.target.id.split('').map(Number);
        
            console.log(`Current player before move: ${game.currentPlayer.name} with marker ${game.currentPlayer.marker}`);
        
            if (!game.gameOver && game.board.placeMarker(row, col, game.currentPlayer.marker)) {
                e.target.textContent = game.currentPlayer.marker;
        
                let winner = game.board.checkWinner();
                if (winner) {
                    game.gameOver = true;
                    displayResult(winner === "draw" ? "It's a draw!" : `${game.currentPlayer.name} wins!`);
                } else {
                    game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1;
                    game.updateBoardUI();  
                }
            }
        });
    });

    document.querySelector("#resetButton").addEventListener("click", () => {
        //reset button wasnt working, just reload the page! will fix in the future
        location.reload();
    });
});

function displayResult(resultMessage) {
    const resultsDiv = document.querySelector("#results");
    resultsDiv.textContent = resultMessage;
}


const Gameboard = () => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        if (row < 0 || row >= 3 || col < 0 || col >= 3) {
            alert("Invalid position!");
            return false;
        }

        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }
        return false;
    };

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
        }
        if (board[1][1] && 
            ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) || 
             (board[0][2] === board[1][1] && board[1][1] === board[2][0]))) {
            return board[1][1];
        }

        return board.some(row => row.includes("")) ? null : "draw";
    };

    const resetBoard = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    };

    return {
        getBoard,
        placeMarker,
        checkWinner,
        resetBoard
    };
};

class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}

const PlayGame = () => {
    const board = Gameboard();
    const player2 = new Player("Player 2", "O");
    const player1 = new Player("Player 1", "X");
    let currentPlayer = player1;
    let gameOver = false;

    const startGame = () => {
        gameOver = false;
        board.resetBoard();
        updateBoardUI();
    };

    const restartGame = () => {
        gameOver = false;
        currentPlayer = player1;
        board.resetBoard();
        updateBoardUI();
    };

    const updateBoardUI = () => {
        const cells = document.querySelectorAll(".cell");
        const boardData = board.getBoard();
        
        cells.forEach(cell => {
            const [row, col] = cell.id.split('').map(Number);
            const currentContent = cell.textContent; 
            const newContent = boardData[row][col];
    
            if (currentContent !== newContent) {
                cell.textContent = newContent;
            }
        });
    };

    return {
        board,
        player1,
        player2,
        currentPlayer,
        gameOver,
        startGame,
        restartGame,
        updateBoardUI,
        resetBoard: board.resetBoard
    };
};
