import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const SettingsLayout = () => {
  return (
    <div className="min-h-full flex flex-col gap-6 bg-dragon-100 dark:bg-dragon-900 text-dragon-700 dark:text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
