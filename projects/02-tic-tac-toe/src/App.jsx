

import { useState } from "react";
import confetti from 'canvas-confetti';

import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx"
import { Board } from "./components/Board.jsx"
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { saveGameStorage, resetGameStorage } from "./storage";




function App() {
  // definimos el tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    //if (boardFromStorage) return JSON.parse(boardFromStorage);
    //return Array(9).fill(null);
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);





  const updateBoard = (indice) => {
    if (board[indice] !== null || winner) return;
    //Recibimos el indice de donde ha pulsado el usuario
    // creamos un nuevo tablero
    const newBoard = board.map((item, index) => {
      if (index === indice) return turn;
      return item;
    })
    setBoard(newBoard);

    // cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar partida usando el local storage
    saveGameStorage(newBoard, newTurn);
    // revisamos si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
      resetGameStorage();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(() => winner || turn);
    setWinner(null);
    resetGameStorage();
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className='game'>
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <section className="turn">
        {/* Mostramos el turno de la constante */}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <section>
        <button onClick={resetGame}>Otra partida</button>
      </section>
      {/* Modal */}
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>


  )

}

export default App
