import { Link } from "../components/Link"
function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Esta es la página inicial del sitio web</p>
      <Link to="/about">Ir a Sobre nosotros</Link>
    </>
  )

}

export default HomePage