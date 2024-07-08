import { WINNER_COMBOS } from '../constants.js';
const checkWinner = boardToCheck => {
    // Comprobamos las combinaciones ganadoras

    for (let combination of WINNER_COMBOS) {
        const [a, b, c] = combination;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }

    return null;
};

const checkEndGame = boardToCheck => {
    return boardToCheck.every(square => square !== null);
};
export { checkWinner, checkEndGame };
