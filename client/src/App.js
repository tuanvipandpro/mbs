// import { lazy } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MarketPage from './pages/MarketPage'
import PersonPage from './pages/PersonPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketPage/>,
  },
  {
    path: '/person',
    element: <PersonPage/>,
  },
]);

const App = () => {
  return <RouterProvider router={router}/>
}

export default App