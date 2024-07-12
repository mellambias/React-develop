# Ejemplo

1. Ecommerce

    - Muestra una lista de productos que proceden de un JSON
    - Añade un filtro por categoria
    - Añade un filtro por precio

    Utiliza `useContext` para evitar pasas **props** inecesarias

2. Shopping Cart

    - Funcionalidad:
      - Añadir productos al carro de compra
      - eliminar productos al carro de compra
      - Modificar la cantidad de productos al carro de compra

    - Sincroniza los cambios del carro con la lista de productos
    - Guarda en **localStorage** el carro para que se recupere al recargar la página

## Preparación

- Creamos el proyecto `Shopping-cart` con `vite@latest`
- Creamos una carpeta `mocks` y añadimos el archivo `produts.json` al que añadiremos los productos
 del endpoint `https://dummyjson.com/products?limit=30&skip=0`
- Traemos los estilos `index.css`
- Los iconos en `components`->`Icons.jsx` donde exportamos los componentes _svg_

## Mostrar la lista de productos

- Creamos un componente llamado `Products` en su archivo para que renderice los productos
- Creamos los filtros en `App.jsx`

```js
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });

  const filterProducts = (products) => {
      return products.filter(product => {
        return (
          product.price >= filters.minPrice &&
          (filters.category === "all" || filters.category === product.category)
        )
      });
    }
```

- Creamos los componentes `Filters` y `Header`
  - `Filter` lo usaremos en el `Header`
  - `Header` lo usamos en `App`
