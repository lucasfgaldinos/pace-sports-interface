import { createBrowserRouter } from 'react-router';
import { Footer, Header } from '../components';
import { Cart, Home, Login, Products, Register } from '../containers';
import { Checkout } from '../containers/Checkout';
import { CheckoutCompleted } from '../containers/CheckoutCompleted';

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
  {
    path: '/checkout',
    element: (
      <>
        <Header />
        <Checkout />
        <Footer />
      </>
    ),
  },
  {
    path: '/checkout-completo',
    element: (
      <>
        <Header />
        <CheckoutCompleted />
        <Footer />
      </>
    ),
  },
]);
