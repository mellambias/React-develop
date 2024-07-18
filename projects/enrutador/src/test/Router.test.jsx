import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { getCurrentPath } from "../utils/utils";
import { Router } from "../components/Router";
import { Route } from '../components/Route';
import { Link } from '../components/Link';

// vamos a simular la funcion getCurrentPath para que nos devuelva la ruta actual que nos interese
vi.mock("../utils/utils", async (importOriginal) => {
  const originalModule = await importOriginal()
  return {
    ...originalModule,
    getCurrentPath: vi.fn()
  }
})


describe("Router", () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it("Deberia renderizarse sin problemas", () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy();
  })
  it("Debe renderizar 404 si la ruta no coincide", () => {
    render(<Router routes={[]} />)
    console.log(screen.debug())
    expect(screen.getByText("Page Not Found 404")).toBeTruthy()
  })
  it("Deberia renderizar el componente de la primera ruta que conincide", () => {
    getCurrentPath.mockReturnValue('/about');
    const routes = [
      {
        path: '/',
        component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        component: () => <h1>About</h1>
      }
    ]
    render(<Router routes={routes} />)
    expect(screen.getByText("About")).toBeTruthy()
  })
  it("Deberia navegar usando Links", async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router >
        <Route path="/" component={() => {
          return (
            <>
              <h1>Home</h1>
              <Link to="/about">Ir a About</Link>
            </>
          )
        }} />
        <Route path="/about" component={() => <h1>About</h1>} />
      </Router>
    )
    const link = screen.getByText(/Ir a About/)
    fireEvent.click(link)
    const aboutText = await screen.getByText("About")
    expect(aboutText).toBeTruthy()
  })
})