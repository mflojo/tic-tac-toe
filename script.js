const Gameboard = () => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }
        return false;
    };

    const checkWinner = () => {
        const winCondition = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];

        for (let line of winCondition) {
            if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
                return line[0];
            }
        }

        return board.flat().includes("") ? null : "draw";
    };

    const resetBoard = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
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

const Player = (name, marker) => {
    return {name, marker};
};

const PlayGame = () => {
    const gameboard = Gameboard();
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playRound = (row, col) => {
        if (gameboard.placeMarker(row, col, currentPlayer.marker)) {
            let winner = gameboard.checkWinner();
            if (winner) {
                return winner === "draw" ? "It's a draw, play again!" : `${currentPlayer.name} wins!`;
            }
            switchTurn();
            return `${currentPlayer.name}'s turn`;
        }
        return "Invalid move, try again";
    };

    return {
        playRound,
        getBoard: gameboard.getBoard
    }
};

const game = PlayGame();
console.log(game.playRound(0,0));