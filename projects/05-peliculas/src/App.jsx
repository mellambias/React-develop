import { useState } from 'react';
import './App.css'
// componentes
import { Movies } from './components/Movies'
// hooks
import { useMovies } from './hooks/useMovies'
import { useDebounce } from './hooks/useDebounce';

function useSearch() {
  const [query, setQuery] = useState("")
  return { query, setQuery }
}

function App() {
  const [sort, setSort] = useState(false) // indica si debemos ordenar las peliculas por año
  const { query, setQuery } = useSearch();
  const { movies, getMovies, loading } = useMovies({ sort });
  const debounceQuery = useDebounce((newSearch) => {
    console.log(newSearch);
    getMovies({ query: newSearch })
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ query })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setQuery(newSearch);
    debounceQuery(newSearch)
  }
  // JSX
  return (
    <div className='page'>
      <h1>Buscador peliculas</h1>
      <header>
        <form className='search' onSubmit={handleSubmit}>
          <input
            name="query"
            value={query}
            onChange={handleChange}
            type="text"
            placeholder='Batman, avengers' />
          <input
            type="checkbox"
            name="sortByTitle"
            value={sort}
            onChange={handleSort}
          />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {loading ? <p>Buscando peliculas...</p>
          : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
