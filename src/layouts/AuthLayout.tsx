import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { MapPin } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-full flex flex-col bg-dragon-100 dark:bg-dragon-900 text-dragon-700 dark:text-white">
      <header className="border border-dragon-200 dark:border-dragon-800 shadow-sm py-6 px-6 bg-dragon-100 dark:bg-dragon-900">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-dragon-primary" />

            <span className="text-xl font-bold text-dragon-700 dark:text-white">PinMe</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-dragon-700 hover:text-dragon-500 dark:text-white dark:hover:text-dragon-300 text-sm"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-dragon-primary hover:bg-dragon-secondary transition-all duration-300 text-white rounded-md text-sm"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-dragon-100 dark:bg-dragon-900">
        <Outlet />
      </main>
    </div>
  );
};
