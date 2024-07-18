import { useState } from 'react';
import { products as initialProducts } from './mocks/products.json';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Filters } from './components/Filters';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { CartProvider } from './context/cart';
import { useFilters } from './Hooks/useFilters';


function App() {
  const [products] = useState(initialProducts);
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);

  return (
    <CartProvider>
      <Header>
        <Filters />
        <Cart />
      </Header>
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  )
}

export default App
