/* Vamos a separar la logica del estado en un reducer */
const cartInitialState = JSON.parse(localStorage.getItem('cart')) || [];

const updateLocalStorage = state => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartReducer = (cart, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TO_CART': {
      const productIndex = cart.findIndex(item => item.id === payload.id);
      let newCart = [...cart];
      if (productIndex !== -1) {
        newCart[productIndex].qty++;
      } else {
        newCart.push({ ...payload, qty: 1 });
      }
      updateLocalStorage(newCart);
      return newCart;
    }
    case 'REMOVE_FROM_CART': {
      if (action.all) {
        return cart.filter(item => item.id !== payload.id);
      }
      const productIndex = cart.findIndex(item => item.id === payload.id);
      let newCart = [...cart];
      if (cart[productIndex].qty - 1 > 0) {
        newCart[productIndex].qty--;
      } else {
        newCart = cart.filter(item => item.id !== payload.id);
      }
      updateLocalStorage(newCart);
      return newCart;
    }
    case 'CLEAR_CART': {
      updateLocalStorage([]);
      return [];
    }
  }
};

export { cartInitialState, cartReducer };
