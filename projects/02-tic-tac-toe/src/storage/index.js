/*
Utiliza el LocalStorage
*/

function saveGameStorage(board, turn) {
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn);
}
function resetGameStorage() {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
}

export { saveGameStorage, resetGameStorage };
