import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { Slide, ToastContainer } from 'react-toastify';
import { AppProvider } from './hooks';
import { router } from './routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" transition={Slide} />
    </AppProvider>
  </StrictMode>,
);
