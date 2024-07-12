import { useState } from 'react';
import { products as initialProducts } from './mocks/products.json';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Filters } from './components/Filters';

function App() {
  const [products] = useState(initialProducts);

  // Filtros
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0 });

  const updateMinPrice = (minPrice) => {
    setFilters({ category: filters.category, minPrice });
  }
  const updateCategory = (category) => {
    setFilters({ category, minPrice: filters.minPrice });
  }


  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || filters.category === product.category)
      )
    });
  }

  const filteredProducts = filterProducts(products);
  const update = {
    updateMinPrice,
    updateCategory
  }

  return (
    <>
      <Header>
        <Filters filters={filters} update={update} />
      </Header>
      <Products products={filteredProducts} />
    </>
  )
}

export default App
