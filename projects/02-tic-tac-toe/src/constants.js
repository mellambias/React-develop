// Creamos una constante para los turnos
const TURNS = {
    X: '❌',
    O: '🔵',
};

const WINNER_COMBOS = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
    [6, 7, 8],
    [2, 5, 8],
];

export { TURNS, WINNER_COMBOS };
