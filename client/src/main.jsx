import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import SingleThought from './pages/SingleThought';
import Dashboard from './pages/Dashboard';
import Item from './pages/Item'
import Error from './pages/Error';
import CheckoutPage from './components/CheckoutPage/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/me',
        element: <Dashboard />
      },
       {
        path: '/profiles/:username',
        element: <Dashboard />
      }, 
      {
        path: '/checkout',
        element: <CheckoutPage />
      },
      { path: '/item',
        element: <Item />
      },
      //Erase later
      // {
      //   path: '/thoughts/:thoughtId',
      //   element: <SingleThought />
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
