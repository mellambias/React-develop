# Prueba tecnica juniors y Trainees de React

Dadas dos APIs

- Facts random : `https://catfact.ninja/fact`
- Imagen random : `https://cataas.com/cat/says/hello`

1. Recupera un _"hecho" aleatorio_ de gatos y muestra una imagen de un gato con la primera palabra del hecho.

## Preparar proyecto

1. Creamos un fichero `README.md` con el contenido de la prueba
2. Utilizamos vite como entorno para Javascript vainilla

    ```cmd
    npm create vite@latest
    cd <nombre del proyecto>
    ```

3. Instalamos un plug-in de vite para react

    ```cmd
    npm install @vitejs/plugin-react -E
    ```

4. Instalamos las dependencias de React

    ```cmd
    npm install react react-dom -E 
    ```

## Configuración

1. Creamos el fichero `vite.config.js`
2. El punto de entrada de la aplicación React
    Se encuentra en el fichero `main.js` ya que es el módulo de javascript que carga `index.html`

3. En el fichero `main.js`

    ```js
        import {createRoot} from 'react-dom/client'
        // buscamos el elemento de index.html donde queremos renderizar react
        const app = document.getElementById("app")

        // creamos la raiz para react relacionada con el elemento
        const root = createRoot(app);

        // Renderizamos el contenido
        root.render(<h1>Prueba Técnica</h1>);

    ```

4. Cambiamos la extensión `.js` por `.jsx` en los ficheros que renderizan componentes para que el
 plugin que utilizamos pueda transpilar el código.

5. Instalamos el **linter** como dependencia de desarrollo

    ```cmd
    npm install standard -D
    ```

6. En el `package.json` configuramos el atributo para el linter

    ```json
    "eslintConfig":{
        "extends":"./node_modules/standard/eslintrc.json"
    }
    ```

7. Creamos un directorio `src` donde trabajaremos

## Prueba

Desglosamos los pasos de la prueba:

1. Recupera un hecho aleatorio
2. Recupera la primera palabra del hecho
3. Muestra una imagen de un gato con la primera palabra

## App

Creamos un fichero `App.jsx` que renderizará la aplicación

>Es importante que se muestre en pantalla los avances cuando se trata de **live coding**

Vamos a ir de forma incremental mostrando los avances utilizaremos los estados `useState` para guardar el hecho aleatorio
y mostrarlo.

usaremos `useEffect` para solicitar los datos a la primera API

- Estudiemos la primera API
  - Breeds
  - Facts
    - /facts: Devuelve un hecho aleatorio
    - /facts: Devuelve una lista de hechos

El **Endpoint** que nos interesa es `https://catfact.ninja/fact` que devuelve un aleatorio en formato json:

 ```json
  {
      "fact": String con el hecho,
      "length": Longitud del hecho
  }
 ```

El **Endpoint** de la segunda api es `https://cataas.com/cat/says/:text` devuelve una imagen con el texto

## Segunda parte

- El diseño tiene que quedar centrado

Aquí podemos utilizar _CSS inline_ o _CSS importado_ según las preferencias del entrevistador

- Añade un boton para obtener un nuevo _fact_

Para reutilizar la lógica tenemos que sacar el contenido del `useEffect` en una función

```js
async function getFact() {
        const result = await fetch(API_FACT);
        const { fact } = await result.json();

        setFact(fact);
    }

    useEffect(getFact, [])

    const handleClick = () => {
        getFact();
    }

    <button onClick={handleClick}>Nuevo fact</button>
```

Separamos la lógica creando un nuevo archivo. Como se trata de un acceso a datos se puede considerar un **servicio**, así que creamos un directorio `services`

- Evitar pasar los estados fuera del componente

- Para cada `useEffect` creamos un fichero para un _customHook_, Los customHooks siguen las mismas reglas que los _Hooks_ de react
su nombre empieza con `use` y solo pueden ser llamados en el cuerpo del componente

## Testing

Para hacer un _testing_ end-to-end podemos utilizar muchos frameworks, en este caso utilizaremos `playwright`

```cmd
npm init playwright@latest
```

- Cambiamos la extensión del `playwright.config.js` por `cjs` que corresponde a _commond js_ (usa `require` en lugar de `import`)

Ejecutamos los test

```cmd
npx playwright test
```
