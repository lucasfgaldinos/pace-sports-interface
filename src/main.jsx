import { Elements } from '@stripe/react-stripe-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { Slide, ToastContainer } from 'react-toastify';
import { stripePromise } from './config/stripeConfig';
import { AppProvider } from './hooks';
import { router } from './routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
      <ToastContainer position="top-center" transition={Slide} />
    </AppProvider>
  </StrictMode>,
);
