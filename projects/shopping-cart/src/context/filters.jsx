/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(
    {
      category: 'all',
      minPrice: 0
    });
  const updateMinPrice = (minPrice) => {
    setFilters({ category: filters.category, minPrice });
  }
  const updateCategory = (category) => {
    setFilters({ category, minPrice: filters.minPrice });
  }
  const update = {
    updateMinPrice,
    updateCategory
  }
  return (
    <FiltersContext.Provider value={{ filters, update }}>
      {children}
    </FiltersContext.Provider>
  )
}