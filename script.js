const Gameboard = () => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        if (row < 0 || row >=3 || col < 0 || col >= 3) {
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
        board.forEach(row => row.fill(""));
    };

    const printBoard = () => {
        console.log("\nCurrent Board:");
        board.forEach(row => console.log(row.join(" | ")));
        console.log("\n");
    };

    return {
        getBoard,
        placeMarker,
        checkWinner,
        resetBoard,
        printBoard
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
    const player1 = new Player("Player 1", "X");
    const player2 = new Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playRound = (row, col) => {
        if (gameOver) {
            return `Game over! ${currentPlayer} won :)`;
        }

        if (board.placeMarker(row, col, currentPlayer.marker)) {
            board.printBoard();
            let winner = board.checkWinner();
            if (winner) {
                gameOver = true;
                return winner === "draw" ? "It's a draw, play again!" : `${currentPlayer.name} wins!`;
            }
            switchTurn();
            return `${currentPlayer.name}'s turn`;
        }
        return "Invalid move, try again";
    };

    const startGame = () => {
        gameOver = false;
        console.log("\nGame start! Starting board: ");
        board.printBoard();
    };

    const restartGame = () => {
        board.resetBoard();
        currentPlayer = player1;
        gameOver = false;
        return "A new game has started.";
    };

    return {
        playRound,
        getBoard: board.getBoard,
        startGame,
        restartGame
    };
};

const game = PlayGame();
game.startGame();
console.log(game.playRound(0, 0)); 
console.log(game.playRound(0, 1)); 
console.log(game.playRound(1, 0)); 
console.log(game.playRound(1, 1)); 
console.log(game.playRound(2, 2)); 
console.log(game.playRound(2, 1));
console.log(game.restartGame());