import './Footer.css'
import { useContext } from 'react';
import { FiltersContext } from '../context/filters'


export function Footer() {
  const { filters } = useContext(FiltersContext);
  return (
    <footer className='footer'>
      <h4>Prueba técnica de React ⚛️</h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
      {JSON.stringify(filters, null, 2)}<br />
    </footer>
  )
}