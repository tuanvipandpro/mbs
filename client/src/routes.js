import { lazy } from 'react'

const MarketPage = lazy(() => import('./pages/MarketPage'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/market', name: 'Market', element: MarketPage },
]

export default routes
