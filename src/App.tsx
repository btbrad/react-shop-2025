import './styles/base.css'
import Guide from './containers/Guide'
import Login from './containers/Account/login'
import Register from './containers/Account/register'
import Account from './containers/Account'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path: '/',
    element: <Guide />,
  },
  {
    path: '/account',
    element: <Account />,
    children: [
      {
        path: '/account/login',
        element: <Login />,
      },
      {
        path: '/account/register',
        element: <Register />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
