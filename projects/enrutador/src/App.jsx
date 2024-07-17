import './App.css'
import HomePage from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import { Router } from './componets/Router.jsx'
import { SearchPage } from './pages/search.jsx';

const appRoutes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/about",
    component: AboutPage
  },
  {
    path: "/search/:query",
    component: SearchPage
  }
]

function App() {

  return (
    <>
      <Router routes={appRoutes} />
    </>
  )
}

export default App
