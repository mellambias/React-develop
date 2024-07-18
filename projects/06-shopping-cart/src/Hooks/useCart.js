import { useContext } from 'react';
import { CartContext } from '../context/cart';

function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }

  return context;
}

export { useCart };
