import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };
  return (
    <header className="border border-dragon-200 dark:border-dragon-800 shadow-sm py-6 px-6 sticky top-0 bg-white dark:bg-dragon-900 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-dragon-700 dark:text-white">PinMe</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button className="min-w-[100px] py-1" onClick={handleSignOut}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};
