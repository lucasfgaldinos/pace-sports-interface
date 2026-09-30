import { createBrowserRouter } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Products } from '../containers/Products';
import { Register } from '../containers/Register';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: '/produtos',
    element: (
      <>
        <Header />
        <Products />
        <Footer />
      </>
    ),
  },
]);
