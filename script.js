//gameboard factory to handle all the board functions
const Gameboard = () => {
    //2d array for the 3x3 tic tac toe board
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    //calls the board
    const getBoard = () => board;

    //place a player marker
    const placeMarker = (row, col, marker) => {
        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }
        return false;
    };

    //need to constantly check if someone has won
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

    //clear board for new games
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
        checkWinner
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
}