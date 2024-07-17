import './App.css'
import { Router } from './componets/Router.jsx'
import { Route } from './componets/Route.jsx'
import { lazy } from 'react';
import { Suspense } from 'react';
const HomePage = lazy(() => import('./pages/Home.jsx'))
const AboutPage = lazy(() => import('./pages/About.jsx'))
const SearchPage = lazy(() => import('./pages/search.jsx'))

const appRoutes = [
  {
    path: "/search/:query",
    component: SearchPage
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        < Router routes={appRoutes} >
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
