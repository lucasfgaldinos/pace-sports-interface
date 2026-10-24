import { Navigate, Outlet } from 'react-router';
import { SideNavAdmin } from '../components/SideNavAdmin';

export const AdminLayout = () => {
  const userData = JSON.parse(localStorage.getItem('paceSports:userData'));

  const { is_admin: isAdmin } = userData;

  return isAdmin ? (
    <main
      className="min-h-screen grid overflow-y-clip"
      style={{ gridTemplateColumns: 'minmax(200px, 300px) 1fr' }}
    >
      <SideNavAdmin />
      <Outlet />
    </main>
  ) : (
    <Navigate to="/login" />
  );
};
