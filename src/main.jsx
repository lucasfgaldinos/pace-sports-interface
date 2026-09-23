import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Slide, ToastContainer } from 'react-toastify';
import { Login } from './containers/login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  </StrictMode>,
);
