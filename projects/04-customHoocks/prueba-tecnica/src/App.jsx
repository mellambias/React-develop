import './App.css'
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";

function App() {
    const [fact, getFact] = useCatFact();
    const { imageUrl } = useCatImage({ fact });

    const handleClick = async () => {
        getFact()
    }

    return (
        <main className="pt-main">
            <h1 className="pt-h1">Curiosidades sobre gatos</h1>
            <button onClick={handleClick}>Nueva curiosidad</button>
            {fact && <p className="pt-fact">{fact}</p>}
            {imageUrl && <img className="pt-img" src={imageUrl} alt={`Image extracted using the word for "${fact}"`} />}

        </main>
    )
}

export default App