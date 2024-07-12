/* eslint-disable react/prop-types */
// Estilos
import './Products.css';

// Iconos
import { AddToCartIcon } from "./Icons";

export function Products({ products }) {
  return (
    <main className='products'>
      <ul className='products-list'>
        {products.map(product => (
          <li className='product' key={product.id}>
            {product.category}
            <img className='product-image'
              src={product.thumbnail}
              alt={product.title}
            />
            <div>
              <strong>{product.title}</strong> - {product.price} &euro;
            </div>
            <div>
              <button>
                <AddToCartIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}