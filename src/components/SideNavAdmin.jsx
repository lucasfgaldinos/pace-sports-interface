import { List, LogOut, ScrollText, SquarePlus } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';
import paceSportsIcon from '../assets/ps-branco-rascunho.png';
import { useUser } from '../hooks/UserContext';

const navLinks = [
  {
    id: 1,
    label: 'Pedidos',
    path: '/admin/pedidos',
    Icon: ScrollText,
  },
  {
    id: 2,
    label: 'Produtos',
    path: '/admin/produtos',
    Icon: List,
  },
  {
    id: 3,
    label: 'Novo produto',
    path: '/admin/novo-produto',
    Icon: SquarePlus,
  },
];

export const SideNavAdmin = () => {
  const { userInfo, logout } = useUser();

  const { pathname } = useLocation();

  return (
    <div className="flex flex-col min-h-dvh justify-between p-2 bg-dark">
      <div>
        <div className="flex gap-4 items-center">
          <img className="w-10" src={paceSportsIcon} alt="Icon Pace Sports" />
          <p className="font-bold text-pace-white">Admin</p>
        </div>

        <div className="flex flex-col gap-3 mt-20">
          {navLinks.length > 0 &&
            navLinks.map(({ Icon, id, label, path }) => (
              <Link
                className={twMerge(
                  'flex gap-2 items-center font-medium px-3 py-2 bg-neutral/20 rounded-lg text-pace-white hover:bg-neutral/50 active:scale-95 transition-all cursor-pointer',
                  pathname === path &&
                    'bg-primary active:scale-100 hover:bg-primary cursor-default',
                )}
                key={id}
                to={path}
              >
                <Icon size={18} color="#F9F9FF" />
                {label}
              </Link>
            ))}
        </div>
      </div>

      <div className="border-t border-neutral/40 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-lg p-1.5 text-pace-white text-sm hover:bg-neutral/20">
          <div className="text-pace-white flex items-center justify-center text-[10px] rounded-full w-6 h-6 bg-neutral/30">
            {userInfo?.name?.charAt(0)}
          </div>
          {userInfo.name}
        </div>

        <Link
          to="/login"
          onClick={logout}
          className="flex items-center rounded-lg text-sm text-pace-white bg-pace-red/20 transition-all gap-2 p-1.5 cursor-pointer hover:bg-pace-red/50 active:scale-95"
        >
          <LogOut size={14} color="#F9F9FF" />
          Sair
        </Link>
      </div>
    </div>
  );
};
