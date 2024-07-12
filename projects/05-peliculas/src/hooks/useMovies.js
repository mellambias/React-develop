import { useState, useRef, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastQuery = useRef('');

  // crearemos la función una sola vez usando [] como dependencias e inyectando el valor directamente a la función
  // este useCallback hace lo mismo que el useMemo exclusivo para funciones
  const getMovies = useCallback(async ({ query }) => {
    if (lastQuery.current === query) {
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const newMovies = await searchMovies({ query });
      setMovies(newMovies || []);
    } catch (error) {
      setError(error.message);
      setMovies([]);
    } finally {
      setLoading(false);
      lastQuery.current = query;
    }
  }, []);

  // Para evitar tener que volver a calcular el orden a cada renderizado usamos useMemo que solo se ejecuta si las dependencia lo hacen
  const sortedMovies = useMemo(() => {
    if (!movies) return [];
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);
  return { movies: sortedMovies, getMovies, loading, error };
}
