
import { EVENTS } from '../consts';

function navigate(href) {
  // Ponemos la URL en la pila de history
  window.history.pushState({}, '', href);

  // Creamos un evento que avise del cambio
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  // lanzamos el evento
  window.dispatchEvent(navigationEvent);
}

function Link({ target, to, children, ...props }) {
  const handleClick = (e) => {

    const isPrimary = e.button === 0;
    const isManageable = target === undefined || target === '_self'
    const isModified = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    if (isPrimary && isManageable && !isModified) {
      // Navegación con SPA
      e.preventDefault();
      navigate(to);
    }
  }
  return (
    <a onClick={handleClick} href={to} target={target} {...props}>{children}</a>
  )
}


export { Link }