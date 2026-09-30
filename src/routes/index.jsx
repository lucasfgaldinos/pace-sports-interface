import { createBrowserRouter } from 'react-router';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Products } from '../containers/Products';
import { Register } from '../containers/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/produtos',
    element: <Products />,
  },
]);
