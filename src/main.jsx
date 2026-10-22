import { Elements } from '@stripe/react-stripe-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Flip, ToastContainer } from 'react-toastify';
import { stripePromise } from './config/stripeConfig';
import { AppProvider } from './hooks';
import { Router } from './routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Elements>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        transition={Flip}
        theme="colored"
      />
    </AppProvider>
  </StrictMode>,
);
