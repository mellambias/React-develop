# CRUD-REACT-REDUX

Se trata del clasico CRUD (Crearte Read Update Delete) en el que utilizaremos Redux-toolkit

## Iniciar el proyecto

- Instalaremos **Vite** como entorno de desarrollo
- Usaremos [**Biome**](https://biomejs.dev/) como linter y formateador

```shell
pnpm add --save-dev --save-exact @biomejs/biome
pnpm biome init
```

Configuramos `biome.json`

```json
{
 "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
 "organizeImports": {
  "enabled": true
 },
 "linter": {
  "enabled": true,
  "rules": {
   "recommended": true
  }
 },
 "formatter": {
  "enabled": true
 }
}

- Utilizaremos la libreria de componentes [**tremor**](https://www.tremor.so/)
  - Esta libreria utiliza **Tailwind css** así que tambien la instalaremos

  ```shell
  pnpm add -D tailwindcss postcss autoprefixer
  pnpx tailwindcss init -p
```

- Istalaremos Headless UI y sus dependencias

  ```shell
  pnpm install @headlessui/react @headlessui/tailwindcss @tremor/react  @remixicon/react
  pnpm install -D @tailwindcss/forms
  ````

- Configuramos el `tailwind.config.js`
- Utilizaremos algunos iconos de [**heroicons**](https://heroicons.com/)

- En el fichero `index.css` dejaremos unicamente el acceso a tailwind

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Redux-toolkit

Instalaremos la libreria de gestion de estados [**Redux**](https://redux.js.org/)

```shell
pnpm install @reduxjs/toolkit react-redux
```

## Redux

- Necesitamos un `store` donde se guarda el estado

  Creamos el directorio `store` y dentro el fichero `index.ts` donde definimos el store
- Envolveremos la parte de nuestra `App` que tiene que acceder al store en un componente `Provider` de `react-dedux` algo similar a utilizar **context**

- Dividimos el store en partes o **slices**, sub directorios de `store`
- creamos un _slice_ con `createSlice` que recibe un objeto con los atributos
  - name: Nombre del slice
  - initialState: El estado inicial del slice
  - reducers: Un objeto con las funciones `reducer`
- Exportamos el `slice.reducer` que será importado en el fichero `store/index.ts` y añadido al _configStore_ `reducer`

- Para leer del store utilizamos el hook `useSelector` de `react-redux`
- Agrupamos los Hooks en un CustomHook que utilizaremos en el resto de la aplicación

  El proposito es establecer un tipado en un solo lugar, en vez de hacerlo cada vez que usamos `useSelector` tambien separamos es código del componente del manejo del estado

## Middleware

Es un código que se ejecuta entre en dispatch y el storage y entre en storage y el nuevo estado

- Creamo una función en el `store/index.ts` llamada `persistanceMiddleware` que se encargará de la persistencia de los datos

La función recibe el `store` y devuelve una función que recibe como argumento `next` que a su vez devuelve otra función cuyo argumento es la `acción`

```js
function a(store){
  //Procesa el store
  return(
    function b(next){
      // procesa la función next con el nuevo store
      return function c(action){
        // procesa la action
        return (nuevo estado)
      }
    }
  )
}
const result = a(storage)(next)(acction);
```

Una vez creado el _middleware_ lo añadimos a la configuración del store y este los ejecutará en cada una de las llamada
lanzadas por `dispatch`

## Toast

Un **Toast** es un sistema de ventanas emergentes que informan al usuario, vamos a utilizar [**Sonner**](https://sonner.emilkowal.ski/)

```shell
pnpm install sonner
```

Este componente lo utilizaremos para informar sobre el estado global y si esta o no sincronizado con la base de datos

- Utilizaremos como base de datos para hacer las pruebas [**Free fake and reliable API for testing and prototyping.**](https://jsonplaceholder.typicode.com/)

El endpoint que utilizaremos es `https://jsonplaceholder.typicode.com/users`

## Reacción a cambios

En Redux, tanto los **middlewares** como **store.subscribe** son mecanismos que permiten reaccionar a los cambios en el estado de la aplicación, pero tienen diferentes propósitos y se utilizan en diferentes contextos.

### Diferencias

#### Middlewares

1. **Propósito**:
   - Los middlewares son funciones que se ejecutan entre el momento en que una acción es despachada (`dispatch`) y el momento en que llega al reductor (`reducer`).
   - Permiten interceptar y modificar las acciones antes de que lleguen al reductor. Esto es útil para tareas como manejo de efectos secundarios (por ejemplo, solicitudes HTTP), registro de acciones, manipulación de acciones, y lógica condicional antes de la actualización del estado.

2. **Contexto de Ejecución**:
   - Los middlewares se ejecutan antes de que el reductor procese la acción.
   - Pueden despachar nuevas acciones, detener acciones, o modificar acciones.

3. **Uso Común**:
   - Manejo de acciones asincrónicas (por ejemplo, `redux-thunk`).
   - Registro de acciones (por ejemplo, `redux-logger`).
   - Manipulación de acciones (por ejemplo, `redux-saga`).

4. **Configuración**:
   - Los middlewares se configuran cuando se crea el store.

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
```

#### `store.subscribe`

1. **Propósito**:
   - `store.subscribe` permite ejecutar funciones de escucha (listeners) cada vez que el estado del store cambia.
   - Estas funciones se ejecutan después de que una acción ha sido procesada por el reductor y el estado ha sido actualizado.

2. **Contexto de Ejecución**:
   - Las funciones registradas con `store.subscribe` se ejecutan después de que el reductor ha actualizado el estado.
   - No pueden interceptar o modificar acciones.

3. **Uso Común**:
   - Actualización de la interfaz de usuario en respuesta a cambios en el estado.
   - Persistencia del estado en almacenamiento externo (por ejemplo, `localStorage`).
   - Sincronización de estado con otras bibliotecas o servicios.

4. **Configuración**:
   - `store.subscribe` se configura directamente en el store después de su creación.

```javascript
const unsubscribe = store.subscribe(() => {
  console.log('El estado ha cambiado:', store.getState());
});
```

### Cuándo Usar Middleware

1. **Efectos Secundarios Asincrónicos**: Si necesitas realizar tareas asincrónicas, como llamadas a API, después de que una acción ha sido despachada, pero antes de que llegue al reductor.
   - Ejemplo: `redux-thunk`, `redux-saga`.

2. **Registro y Debugging**: Para registrar acciones o estados, y para depurar la aplicación.
   - Ejemplo: `redux-logger`.

3. **Lógica Condicional**: Para filtrar, modificar o cancelar acciones antes de que lleguen al reductor.

4. **Manipulación de Flujos de Acciones**: Para manejar flujos complejos de acciones, especialmente en aplicaciones grandes.
   - Ejemplo: `redux-saga`.

### Cuándo Usar `store.subscribe`

1. **Actualización de la Interfaz de Usuario**: Para actualizar la UI en respuesta a cambios de estado en casos donde `react-redux` no se usa.
   - Aunque en aplicaciones React con Redux normalmente usarías `connect` o hooks como `useSelector`, hay casos donde `store.subscribe` puede ser útil fuera del contexto de React.

2. **Persistencia de Estado**: Para guardar el estado de la aplicación en almacenamiento externo, como `localStorage` o `sessionStorage`.

3. **Sincronización con Servicios Externos**: Para sincronizar el estado de la aplicación con otros servicios externos que no están directamente relacionados con la lógica del negocio de la aplicación.

4. **Análisis y Registro de Estado**: Para crear logs o realizar análisis cuando cambian ciertas partes del estado.

### Ejemplo Práctico

#### Middleware para Manejo Asincrónico

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Acción asíncrona con redux-thunk
const fetchData = () => {
  return async (dispatch) => {
    const response = await fetch('/api/data');
    const data = await response.json();
    dispatch({ type: 'DATA_LOADED', payload: data });
  };
};

// Reducer simple
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'DATA_LOADED':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(fetchData());
```

#### Persistencia de Estado con `store.subscribe`

```javascript
import { createStore } from 'redux';

// Reducer simple
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

// Persistir el estado en localStorage
store.subscribe(() => {
  localStorage.setItem('appState', JSON.stringify(store.getState()));
});

// Despachar una acción para probar
store.dispatch({ type: 'UPDATE_STATE', payload: { user: 'John Doe' } });
```

### Conclusión

- Usa **middleware** para interceptar, modificar, o manejar efectos secundarios de las acciones antes de que lleguen al reductor.
- Usa `**store.subscribe**` para ejecutar código en respuesta a cambios de estado después de que el reductor haya procesado una acción y actualizado el estado.

Cada uno tiene su propio lugar y propósito en la arquitectura de una aplicación Redux, y entender cuándo usar cada uno te ayudará a estructurar mejor tu aplicación.
