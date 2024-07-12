import noMovies from '../mock/noMovies.json';
const API_URL = 'https://www.omdbapi.com/';
const API_KEY = '68874fe5';

export async function searchMovies({ query }) {
  if (query) {
    try {
      const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      if (!response.ok) throw new Error('Error fetching data');
      const data = await response.json();
      if (!data?.Search) {
        throw new Error('No hay resultados');
      }
      return data?.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }));
    } catch (error) {
      throw new Error('No tengo peliculas con ese titulo');
    }
  } else {
    return noMovies;
  }
}
