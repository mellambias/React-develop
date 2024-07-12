import { useRef } from 'react';

export function useDebounce(func, delay) {
  let timeoutId = useRef();

  return function (...args) {
    // Si ya hay un temporizador activo, lo limpiamos
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    console.log(`dando ${delay}ms de tiempo a la función debounced`, args);
    // Iniciamos un nuevo temporizador
    timeoutId.current = setTimeout(() => {
      console.log('Ejecutando la función debounced');
      func.apply(this, args);
    }, delay);
  };
}
