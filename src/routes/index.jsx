import { createBrowserRouter } from 'react-router';
import { Home } from '../containers/home';
import { Login } from '../containers/login';
import { Products } from '../containers/products';
import { Register } from '../containers/register';

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
