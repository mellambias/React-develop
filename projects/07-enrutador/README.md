# Crear un Router para React

- [x] Instalar el linter
- [x] Crea una forma de navegar al estilo de una Multiple Page Aplication (MPA)
- [x] Crea una forma de navegar al estilo de una Single Page Aplication (SPA)
- [x] Hacer que la navegación entre páginas utilice el boton atras
- [x] Crea un componente `Link` que pertita establecer los enlaces de navegación
- [x] Crea un componente `Router` que agrupe rutas
- [x] Hacer que la ruta por defecto sea 404
- [x] Implementar rutas con parámetros
- [x] Crea un componente `Route` para cada ruta
- [x] Implementar la carga bajo de manda de rutas (lazy load)
- [x] Realizar pruebas
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

- Analizamos la ruta actual con el patrón suministrado por `path` y devolvemos el componente

```jsx
  ...
  const Page = routes.find(({ path }) => {
      // Si el path coincide
      if (path === currentPath) return true

      // Creamos una función para encontrar coincidencias con la ruta dinamica
      // /about/:query
      const matcherUrl = match(path, { decode: decodeURIComponent })
      // buscamos las coincidencias con nuestra ruta actual
      // /about/react
      const matched = matcherUrl(currentPath);
      if (!matched) return false
      // Guardamos las coincidencias
      // matched.params.query === 'react'
      routeParams = matched.params
      return true
    })?.component
    return Page
      ? <Page routeParams={routeParams} />
      : <Page404 routeParams={routeParams} />
```

## Crea un componente `Route` para cada ruta

[**jsdom**](https://www.npmjs.com/package/jsdom)

is a pure-JavaScript implementation of many web standards, notably the WHATWG* DOM and HTML Standards, for use with Node.js. In general, the goal of the project is to emulate enough of a subset of a web browser to be useful for testing and scraping real-world web applications.

*Web Hypertext Application Technology Working Group

- Creamos un componente `Route` que renderiza `null`. Este será utilizado para leer sus propiedades desde `Router`
- Utilizaremos la utilidad de react `Children` que nos permite acceder a los hijos como elementos iterables
- Añadimos a `routes` los valores leidos en los hijos

```js
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    return type.name === "Route" ? props : null
  })
```

- Unimos las dos rutas, la que proviene del atributo `routes` y las definidas en los hijos `Route` y eliminamos los null

```js
const routesToUse = routes.concat(routesFromChildren).filter(Boolean);
```

## Implementar la carga bajo de manda de rutas (lazy load)

- Vamos a utilizar  la funcion de react `lazy` que nos permite cargar de forma dinámica los componentes
- Para importar de forma dinámica utilizamos promesas

```js
import AboutPage from './pages/About.jsx' <- importación estática 
import ('./pages/About.jsx') <- importación dinámica que devuelve una promesa
```

React ejecutará el import dinamico cuando necesite renderizar el componente convirtiendose así en un _componente dinámico_

```js
const AboutPage = lazy(()=>import ('./pages/About.jsx'))
```

Los componentes dinámicos no estan disponibles para la UI por lo que hay que envolverlos en otro componente
el `<Suspense></Suspense>`

```jsx
const HomePage = lazy(() => import('./pages/Home.jsx'))
const AboutPage = lazy(() => import('./pages/About.jsx'))
const SearchPage = lazy(() => import('./pages/search.jsx'))

function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        < Router routes={appRoutes} >
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}
```

## Realizar pruebas

- Para la pruebas utilizaremos `vitest`

```shell
pnpm install vitest -D
```

- al `package.json` añadimos a los `scripts`
  "test": "vitest"

vamos a probar el router `Router.test.jsx`

- Como son componentes de React, necesitamos renderizarlos usaremos [**happy-dom**](github.com/capricorn86/happy-dom)

> A JavaScript implementation of a web browser without its graphical user interface.

- Como libreria especializada [**@testing-library/react**](https://testing-library.com/docs/react-testing-library/intro/)
- Como libreria especializada [**@testing-library/dom**](https://testing-library.com/docs/dom-testing-library/intro/)

>React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.

```shell
pnpm install happy-dom @testing-library/dom @testing-library/react -D
```

- En la configuración de vite `vite.config.js` tenemos que añadir el entorno de test:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  }
})
```

## Publicar el paquete como un módulo

- En el `package.json` añadimos un script llamado `prepare` que se ejecuta antes del `publish`

**Vite** esta pensado para empaquetar la aplicación completa, para empaquetar módulos utilizaremos directamente SWC.

- Instalamos en el proyecto el compilador [**SWC**](https://swc.rs/)

```shell
pnpm i -D @swc/cli @swc/cor
```

- Creamos un fichero de configuración `.swcrc` para activar ciertas opciones

```json
{
 "$schema": "https://swc.rs/schema.json",
 "jsc": {
 "parser": {
  "syntax": "ecmascript",
  "jsx": true,
  "dynamicImport": false,
  "privateMethod": false,
  "functionBind": false,
  "exportDefaultFrom": false,
  "exportNamespaceFrom": false,
  "decorators": false,
  "decoratorsBeforeExport": false,
  "topLevelAwait": false,
  "importMeta": false
 },
 "transform": {
    "react":{
      "runtime": "automatic"
    }
 },
 "target": "es2020",
 "loose": true,
 "externalHelpers": false,
 // Requires v1.2.50 or upper and requires target to be es2016 or upper.
 "keepClassNames": false
 },
 "minify": true
}
```

Procesa y muestra en la salida estandard

```shell
npx swc ./src/components/Router.jsx
```

- Modificamos el `package.json`
  - Pasamos las dependencias de "react": "18.3.1" y "react-dom": "18.3.1" a "peerDependencies" de este modo el proyecto
  al que se instale deberá tener estas dependencias instaladas
  - Cambiamos `version` y `private`
  - establecemos un punto de entrada al módulo
    - Crear un fichero `index.jsx` en el que **exportaremos** todos los componentes
    - establecemos los atributos `main` y `module` cuyo valor será el fichero `lib/index.js` que será el resultado de compilar el `index.jsx`
  - Establecemos los puntos de acceso al módulo cuando se use `import` o `require`

  ```json
  "version": "0.0.1",
  "type": "module",
  "main": "lib/index.js",
  "module": "lib/index.js",
  "exports": {
    ".": {
      "import": "./lib/index.js",
      "require": "./lib/index.js"
    },
    "./package.json": "./package.json"
  },
  ```

- El script `prepare` compilará los componentes, utilidades y el indice y pondrá su resultado en el directorio lib

```json
"prepare": "npm run test && swc src/components src/utils src/index.jsx -d lib",
```

- Creamos en la raiz del proyecto un fichero `.npmignore` con los directorios y archivos que no deben subir a NPM

```text
src
public
index.html
pnpm-lock.yaml
vite.config.js
.swcrc
```

[publicar en NPM](https://www.youtube.com/watch?v=SgmkNLFFCjM)
pnpm link
