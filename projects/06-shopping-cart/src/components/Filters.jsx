/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useId } from "react";
import './Filters.css'
import { FiltersContext } from '../context/filters';

export function Filters() {
  const priceId = useId();
  const categoryId = useId();
  const { filters, update } = useContext(FiltersContext);
  const handleRange = (event) => {
    update.updateMinPrice(event.target.value);
  }

  const handleCategory = (event) => {
    update.updateCategory(event.target.value);
  }

  return (
    <section className="filters">
      <div className='filters-selector'>
        <label htmlFor={priceId}>Precio mínimo</label>
        <input
          id={priceId}
          type="range"
          min={0}
          max={1000}
          onChange={handleRange}
          value={filters.minPrice}
        />
        <span>{filters.minPrice} &euro;</span>
      </div>
      <div className='filters-selector'>
        <label htmlFor={categoryId}>Categoria</label>
        <select name="category" id={categoryId} onChange={handleCategory} value={filters.category}>
          <option value="all">Todas</option>
          <option value="beauty">Belleza</option>
          <option value="fragrances">Fragancias</option>
          <option value="furniture">Muebles/decoracion</option>
          <option value="groceries">Alimentacion</option>
        </select>
      </div>
    </section>
  )
}