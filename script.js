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


};