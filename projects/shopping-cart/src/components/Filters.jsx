/* eslint-disable react/prop-types */
import './Filters.css'
import { useId, useState } from "react";

export function Filters({ filters, update }) {
  const priceId = useId();
  const categoryId = useId();
  const [price, setPrice] = useState(filters.price || 0);

  const handleRange = (event) => {
    setPrice(event.target.value);
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
          value={price}
        />
        <span>{price} &euro;</span>
      </div>
      <div className='filters-selector'>
        <label htmlFor={categoryId}>Categoria</label>
        <select name="category" id={categoryId} onChange={handleCategory}>
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