# Este proyecto pretende ser un clon del google-translate

- Utilizaremos algunos componentes y estilos de `react-bootstrap`

- Instalamos las dependencias

```shell
pnpm install react-bootstrap bootstrap @popperjs/core@^2.11.8
```

- importamos los estilos dentro del componente `App`

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

## Vamos a crear primero la lógica y luego en lo visual

Veamos que necesitamos conocer:

- el idioma original
- el idioma destino
- el texto del usuario
- el texto resultado de la traducción
- Saber si esta cargando

Vamos a utilizar un `reducer`

- definimos nuestro estado inicial
- pensamos que acciones realizará el usuario para cambiar el estado:

  - Puede cambiar el idioma de origen
  - Puede cambiar el idioma de destino
  - Puede escribir el texto
  - Puede intercambiar el idioma de origen con el de destino

## Como estamos utilizando _typescript_ tenemos que establecer los tipos de datos

- Creamos un fichero `constants.ts` donde definimos las constantes que utilizaremos en los tipos
- Creamos un fichero `types.d.ts` donde definimos los tipos de datos para nuestra app

## Componentes de react cuando utilizan props

- Cuando un componente de react recibe propiedades a través de sus atributos, es necesario definir el
tipo de datos que admite

```tsx
import { MouseEventHandler } from 'react';

interface ArrowIconProps {
  onClick: MouseEventHandler;
}

function ArrowIcon({ onClick }: ArrowIconProps) {
  return (
    <svg
      onClick={onClick}
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <path d='M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z'></path>
    </svg>
  );
}

export { ArrowIcon };
```

- Si el componente es funcional podemos utilizar

```tsx
const ArrowIcon: React.FC<ArrowIconProps> = ({onClick}) => {...}
```

- Podemos definir distintos tipos admitidos en función del valor de una propiedad

```tsx
type LanguageSelectorProps =
  | {
      type: 'from';
      onChange: (language: FromLanguage) => void;
      value: FromLanguage;
    }
  | {
      type: 'to';
      onChange: (LanguageSelectorProps: Language) => void;
      value: Language;
    };
```

## Testing

Usaremos vitest, happy-dom y @testing-library/react @testing-library/user-event

```shell
pnpm install -D vitest happy-dom @testing-library/react @testing-library/user-event @testing-library/dom
```

en el fichero `vite.config.ts` añadimos en la primera linea activamos el auto-completado
indicando que utilizaremos los tipos de "vitest"

```ts
/// <reference types="vitest" />
```

Añadimos a la configuración  _happy-dom_ como entorno para los test

```ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  },
})
```

Creamos el primer test `test\App.test.txt`
