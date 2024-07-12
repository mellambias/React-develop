# Prueba Seniors

Crea una aplicación para buscar peliculas

## API a usar

- `https://www.omdbapi.com/`
- API_KEY: `68874fe5`

## Requisitos

- Mostrar un _input_ para la película y un botón para buscar.
- Lista las peliculas encontradas y muestra el _titulo_, _año_ y _poster_.
- Las películas se deben mostrar en un grid responsive.
- El formulario funcione
- Consumir la API de datos

### Primera iteración

- Evitar se se haga la misma busqueda dos veces seguidas.
- Haz que la busqueda se haga automáticamente al escribir.
- Evita que se haga la búsqueda continuamente al escribir (debounce)

- **TIPS**

- Podemos usar frameworks CSS sin clases que nos permite dar estilos a los elementos HTML sin usar clases
  - [water.css](https://watercss.kognise.dev/)
  - [bolt.css](https://boltcss.com/)

- Ponemos los elementos HTML que necesitamos teniendo presente la semántica
- Centramos el componente `App` usando CSS.
- Buscamos el endpoint que necesitamos y entendamos como funciona la API
- Creamos una carpeta `mock` y guardamos los resultados devueltos
  - devueltos por una buena consulta `https://www.omdbapi.com/?apikey=68874fe5&s=batman`
  - Devueltos por un error  `https://www.omdbapi.com/?apikey=68874fe5&s=noMovie`
- Importamos los ficheros y los utilizamos para mostar los datos

```jsx
return (
    <div className='page'>
      <h1>Buscador peliculas</h1>
      <header>
        <form className='search'>
          <input type="text" placeholder='Batman, avengers' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {
          hasMovies
            ? (
              <ul>
                {
                  movies.map(movie => (
                    <li key={movie.imdbID}>
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                      <img src={movie.Poster} alt={movie.Title} />
                    </li>
                  ))
                }
              </ul>
            )
            : (
              <p>No existen peliculas no este nombre</p>
            )
        }
      </main>
    </div>
  )
```

- Vamos a separar el renderizado en componentes
- creamos la carpeta `components` y añadimos el fichero `Movies.jsx` al que pondremos la lógica
- Debemos separar el contrato de la API que utilizamos con los atributos de nuesto componentes
- Separamos la lógica que obtiene los datos del componente en un _custom Hook_ llamado `useMovies.js`

- **Forma no controlada**

  Utiliza el DOM y sus eventos para capturar la información o usando el `useRef`

  - Para el formulario utilizaremos el API `FormData`

  ```js
    const handleSubmit = (event) => {
      event.preventDefault();
      const dataForm = Object.fromEntries(new FormData(event.target))
      console.log(dataForm);
    }
    ...
    //JSX
    ...
    <form className='search' onSubmit={handleSubmit}>
      <input name="query" type="text" placeholder='Batman, avengers' />
      <button type='submit'>Buscar</button>
    </form>

  ```

- **Forma controlada**

 Es la forma mas sencilla y optima cuando tenemos pocos campos.

- Para ello utilizamos `useState`
  - pasamos al elemento del formulario el **valor** en el atributo `value`
  - y establecemos su nuevo valor usando el evento `onChange`

- **Evitar que se repita la misma busqueda dos veces**
  Para esto utilizamos el `useRef` para que conserve el valor de la busqueda anterior y la compare con la nueva

- **La busqueda se haga automáticamente al escribir**

Utilizaremos `useMemo`

- **Creamos un `debounce`**

Podemos crear uno o utilizar alguno creado
