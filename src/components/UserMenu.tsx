import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from './Avatar';
import { LogOut, Settings } from 'lucide-react';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, getUserData } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = getUserData();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label="User menu">
        <Avatar
          name={user?.name || 'User'}
          className="border-2 border-dragon-200 dark:border-dragon-700"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-dragon-800 border border-dragon-200 dark:border-dragon-700 z-20">
          <div className="py-2 px-4 border-b border-dragon-200 dark:border-dragon-700">
            <p className="font-medium text-dragon-800 dark:text-white">{user?.name || 'Usuário'}</p>
            <p className="text-sm text-dragon-500 dark:text-dragon-400 truncate">
              {user?.email || 'usuário@exemplo.com'}
            </p>
          </div>
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-dragon-700 dark:text-dragon-300 hover:bg-dragon-100 dark:hover:bg-dragon-700"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </span>
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-dragon-700 dark:text-dragon-300 hover:bg-dragon-100 dark:hover:bg-dragon-700"
              onClick={handleSignOut}
            >
              <span className="flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
