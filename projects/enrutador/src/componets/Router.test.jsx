import { vi } from 'vitest';
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { Router } from "./Router";
import { getCurrentPath } from "../utils";

// vamos a simular la funcion getCurrentPath para que nos devuelva la ruta actual que nos interese
vi.mock("../utils", async (importOriginal) => {
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
})