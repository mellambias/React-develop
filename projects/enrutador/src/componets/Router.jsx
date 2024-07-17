import { useEffect, useState } from "react";
import { EVENTS } from "../consts";
import { Page404 } from "../pages/404";
import { match } from "path-to-regexp";

function Router({ routes = [] }) {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      console.log(window.location.pathname)
      setCurrentPath(window.location.pathname);
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)

    }
  }, [])

  let routeParams = {}


  const Page = routes.find(({ path }) => {
    // Si el path coincide
    if (path === currentPath) return true
    console.log("path", path, currentPath);

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