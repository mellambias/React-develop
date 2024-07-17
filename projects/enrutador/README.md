# Crear un Router para React

- [x] Instalar el linter
- [x] Crea una forma de navegar al estilo de una Multiple Page Aplication (MPA)
- [x] Crea una forma de navegar al estilo de una Single Page Aplication (SPA)
- [x] Hacer que la navegación entre páginas utilice el boton atras
- [x] Crea un componente `Link` que pertita establecer los enlaces de navegación
- [x] Crea un componente `Route` que agrupe rutas
- [x] Hacer que la ruta por defecto sea 404
- [x] Implementar rutas con parámetros
- [] Implementar la carga bajo de manda de rutas (lazy load)
- [] Realizar pruebas
- [] Publicar el paquete

## Instalar el linter

pnpm install standard -D

## Crea una forma de navegar al estilo de una MPA

Empezaremos como una página web normal

- utilizaremos [simplecss](https://simplecss.org/) como estilo por defecto en `index.html`

```html
<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">
```

Vamos a tener dos componentes que representan dos páginas `Home` y `About`
y ponemos los componentes en la aplicación.

Ahora tenemos que mostrar una u otra página en función de la _url_:

- Podemos empezar utilizando un estado inicializado al `window.location.pathname`

```jsx
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </>
  )
}
```

Estamos utilizando el _renderizado condicional_

Cada vez que _navegamos_ se refresca todo, mostrando solo los componentes y leyendo todos los recursos desde el servidor

## Crea una forma de navegar al estilo de una Single Page Aplication (SPA)

Para que actue como una SPA debemos manipular el `window.history` y evitar el comportamiento por defecto de los enlaces

- Crearemos una función `navigate` que reciba la `href` y utilice el `history`
- Creamos un evento que lanzaremos cada vez que pongemos una url en el history

```jsx
const NAVIGATION_EVENT = "pushState";

function navigate(href) {
  // Ponemos la URL en la pila de history
  window.history.pushState({}, '', href);

  // Creamos un evento que avise del cambio
  const navigationEvent = new Event(NAVIGATION_EVENT)
  // lanzamos el evento
  window.dispatchEvent(navigationEvent);
}
```

En `App` utilizaremos `useEffect` para suscribirnos al efecto y poder cambiar el estado `currentPath`

En las páginas, por el momento, ustituimos los elementos `a` por botones

```jsx
function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Esta es la página inicial del sitio web</p>
      <button onClick={() => navigate("/about")}>Ir a Sobre nosotros</button>
    </>
  )

}
```

## Hacer que la navegación entre páginas utilice el boton atras

Tenemos que escuchar la navegación cuando vamos hacia atras. Al evento `popstate`

## Crea un componente `Link` que pertita establecer los enlaces de navegación

- Este componente debe responder a las teclas modificadoras que actuan cuando pulsamos un enlace
  - Comando: Abre en una nueva pestaña
  - Mayusculas: Abre en una nueva ventana

Vamos a comprobar qué botón del ratón se ha pulsado y si existe alguna tecla

```js
  function Link({ target, to, children, ...props }) {
  const handleClick = (e) => {

    const isPrimary = e.keyCode === 0;
    const isModified = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    const isManageable = target === undefined || target === '_self'

    if (isPrimary && isManageable && !isModified) {
      // Navegación con SPA
      e.preventDefault();
      navigate(to);
    }
  }
  return (
    <a onClick={handleClick} href={to} target={target} {...props}>{children}</a>
  )
}
```

## Crea un componente `Route` que agrupe rutas

Vamos a `App.jsx` y creamos un array de objetos definiendo la ruta y el componente a renderizar

un Componenete `Router` con el estado y el `useEffect` y que devuelve el componente a renderizar en función de la ruta actual o uno por defecto

## Hacer que la ruta por defecto sea 404

Creamos una página `404` y en el `Router` la utilizamos como alternativa a la pagina en caso de no coincidir con la ruta

## mplementar rutas con parámetros

Para hacer esto vamos a utilizar el paquete [`path-to-regexp`](github.com/pillarjs/path-to-regexp)

```shell
pnpm install path-to-regexp -E
```

## Implementar la carga bajo de manda de rutas (lazy load)

[**jsdom**](https://www.npmjs.com/package/jsdom)

is a pure-JavaScript implementation of many web standards, notably the WHATWG* DOM and HTML Standards, for use with Node.js. In general, the goal of the project is to emulate enough of a subset of a web browser to be useful for testing and scraping real-world web applications.

*Web Hypertext Application Technology Working Group
