import { useEffect, useState } from "react";
import { EVENTS } from "../consts";
import { Page404 } from "../pages/404";
import { match } from "path-to-regexp";
import { Children } from "react";
import { getCurrentPath } from "../utils";

function Router({ children, routes = [] }) {

  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)

    }
  }, [])

  let routeParams = {}

  // Añadimos las rutas configuradas en los hijos
  // utilizaremos la utilidad de react Children que permite leer sus hijos
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    return type.name === "Route" ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    // Si el path coincide
    if (path === currentPath) return true
    // Creamos una función para encontrar coincidencias con la ruta dinamica
    // /about/:query
    const matcherUrl = match(path, { decode: decodeURIComponent })
    // buscamos las coincidencias con nuestra ruta actual
    // /about/react
    const matched = matcherUrl(currentPath);
    if (!matched) return false
    // Guardamos las coincidencias
    // matched.params.query === 'react'
    routeParams = matched.params
    return true
  })?.component
  return Page
    ? <Page routeParams={routeParams} />
    : <Page404 routeParams={routeParams} />
}

export { Router }