import { Outlet } from 'react-router';
import { Footer, Header } from '../components';

export const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
