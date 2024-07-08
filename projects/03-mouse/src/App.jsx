import { useEffect, useState } from "react";

function App() {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: -20, y: -20 });

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    }
    if (enable) {
      window.addEventListener('pointermove', handleMove);
    }
    return () => {
      setPosition({ x: -20, y: -20 });
      window.removeEventListener('pointermove', handleMove);
    }
  }, [enable])

  const handleActivate = () => {
    setEnable(!enable);
  }

  // JSX)
  return (
    <main>
      <div className="bolita" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}></div>
      <button onClick={handleActivate}>
        {enable ? 'Desactivar' : 'Activar'}  seguir puntero
      </button>

    </main>

  )
}

export default App
