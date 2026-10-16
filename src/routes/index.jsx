import { createBrowserRouter } from 'react-router';
import { Footer, Header } from '../components';
import { Cart, Home, Login, Products, Register } from '../containers';

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
  {
    path: '/carrinho',
    element: (
      <>
        <Header />
        <Cart />
        <Footer />
      </>
    ),
  },
]);
