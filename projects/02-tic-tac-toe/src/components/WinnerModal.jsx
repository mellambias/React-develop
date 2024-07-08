import { Square } from "./Square"

function WinnerModal({ winner, resetGame }) {
    if (winner === null) return;
    const winnerText = winner === false ? 'Empate' : `Ganador: ${winner}`;
    return (
        (
            <section className="winner">
                <div className="text">
                    <h2>{winnerText}</h2>
                    <header className="win">
                        {
                            winner && <Square>{winner}</Square>
                        }
                    </header>

                    <footer>
                        <button onClick={resetGame}>Otra partida</button>
                    </footer>
                </div>
            </section>
        )
    )
}

export {
    WinnerModal
}