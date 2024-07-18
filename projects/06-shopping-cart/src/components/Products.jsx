/* eslint-disable react/prop-types */
// Estilos
import './Products.css';

// Iconos
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";

// Hooks
import { useCart } from '../Hooks/useCart';

export function Products({ products }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const checkProductInCart = product => cart.some(item => item.id === product.id)

  const handleAddToCart = (product) => {
    addToCart(product)
  }
  const handleRemoveToCart = (product) => {
    removeFromCart({ product, all: true })
  }
  return (
    <main className='products'>
      <ul className='products-list'>
        {products.length ? (products.map(product => {
          const isProductInChart = checkProductInCart(product);
          return (
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
                {!isProductInChart &&
                  <button style={{ backgroundColor: "blue" }} onClick={() => handleAddToCart(product)}>
                    <AddToCartIcon />
                  </button>
                }
                {isProductInChart &&
                  <button style={{ backgroundColor: "red" }} onClick={() => handleRemoveToCart(product)}>
                    <RemoveFromCartIcon />
                  </button>
                }
              </div>
            </li>
          )
        }
        )
        ) : (<h2>No tenemos nada que coincida con su selección</h2>)}
      </ul>
    </main>
  );
}