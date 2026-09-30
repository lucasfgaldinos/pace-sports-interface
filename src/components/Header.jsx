import { LogOut, ShoppingCart, UserRound } from 'lucide-react';
import { Link, useNavigate, useResolvedPath } from 'react-router';
import logoPaceSports from '../assets/ps-verde.png';
import { useUser } from '../hooks/UserContext';

export const Header = ({ ...props }) => {
  const { pathname } = useResolvedPath();
  const {
    userInfo: { name },
    logout,
  } = useUser();
  const navigate = useNavigate();

  function logoutUser() {
    logout();
    navigate('/login');
  }

  return (
    <header
      className="w-full bg-pace-white/90 shadow fixed z-20 h-18"
      {...props}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between h-18">
        <div className="flex items-center gap-8 h-18">
          <button
            className="cursor-pointer h-fit w-fit bg-transparent"
            type="button"
            onClick={() => navigate('/')}
          >
            <img className="h-16" src={logoPaceSports} alt="logo-pace-sports" />
          </button>

          <nav className="flex items-center gap-6 h-18">
            <Link
              to={'/produtos'}
              className={`font-bold content-center
              ${pathname.includes('/') && 'text-secondary border-b-2 h-full'}`}
            >
              Produtos
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 border border-secondary rounded-full bg-secondary/20">
                <UserRound color="#005321" size={20} strokeWidth={2.5} />
              </div>

              <p className="max-w-32.5 text-sm text-nowrap overflow-hidden text-ellipsis">
                Olá,
                <br />
                <b>{name}</b>
              </p>
            </div>

            <button
              onClick={() => logoutUser()}
              className="text-sm font-medium text-pace-red flex items-center gap-1 px-1 cursor-pointer rounded-xl py-2 hover:bg-pace-red/20 active:scale-95 transition-all"
              type="button"
            >
              <LogOut size={16} color="#BA1A1A" />
              Sair
            </button>
          </div>

          <div className="h-8 border-l border-label/30 w-px" />
          <button
            type="button"
            className="p-2 rounded-full cursor-pointer hover:bg-secondary/20 transition-all active:scale-95"
          >
            <ShoppingCart color="#005321" size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
