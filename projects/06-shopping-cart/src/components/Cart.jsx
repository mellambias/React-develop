// importamos los iconos
import { useId } from "react";
import './Cart.css';
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../Hooks/useCart";
import { CartItem } from "./CartItem";


function Cart() {
  const cartCheckboxId = useId();
  const { cart, total, clearCart, addToCart, removeFromCart } = useCart();


  const handleClear = () => {
    clearCart();
  }

  const handleAdd = (product) => {
    addToCart(product);
  }
  const handleRemove = (product) => {
    removeFromCart({ product, all: false });
  }
  return (
    <>
      {/* Menu desplegable */}
      <label className="cart-button" htmlFor={cartCheckboxId} >
        <CartIcon />
      </label>
      <input type="checkbox" name="cart" id={cartCheckboxId} hidden />

      {/* Contenido del carrito */}
      <aside className="cart">
        <p><strong>Importe :</strong> {total} &euro;</p>
        <ul>
          {cart.map(item =>
            <CartItem
              key={item.id}
              {...item}
              addToCart={() => handleAdd(item)}
              removeToCard={() => handleRemove(item)}
            />
          )}

        </ul>
        {cart.length > 0 ? (<button onClick={handleClear}>
          <ClearCartIcon />
        </button>) : (<p>El carrito esta vacio</p>)}

      </aside>
    </>
  )
}



export { Cart }