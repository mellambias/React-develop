
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { cartInitialState, cartReducer } from "../reducers/cart";

const CartContext = createContext();



function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);
  const [total, setTotal] = useState(0);

  const addToCart = product => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product
    })
  }

  const removeFromCart = ({ product, all }) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
      all
    }
    )
  }

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART"
    })
  }


  useEffect(() => {
    setTotal(cart.reduce((total, { qty, price }) => total = Number.parseFloat((total + (qty * price)).toFixed(2)), 0))
  }, [cart])

  return (
    < CartContext.Provider value={{
      cart,
      addToCart,
      clearCart,
      removeFromCart,
      total
    }} >
      {children}
    </ CartContext.Provider >
  )
}
export { CartContext, CartProvider }