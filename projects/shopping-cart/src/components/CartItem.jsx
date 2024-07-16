/* eslint-disable react/prop-types */
function CartItem({ thumbnail, title, price, qty, addToCart, removeToCard }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title} />
      <div>
        <strong>{title}</strong>
      </div>
      <footer>
        <button onClick={removeToCard}> - </button>
        <button onClick={addToCart}>+</button>
        <small>Qtt:<br /> {qty}</small>
        <small>Importe:<br /> {Number.parseFloat((qty * price).toFixed(2))} &euro;</small>
      </footer>
    </li>
  )
}

export { CartItem }