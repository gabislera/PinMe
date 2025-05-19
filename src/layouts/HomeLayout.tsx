import { Outlet } from 'react-router-dom';
import { Contacts } from '../pages/home/Contacts';
import { Header } from '../components/Header';

export const HomeLayout = () => {
  return (
    <div className="min-h-full flex flex-col gap-6 bg-dragon-100 dark:bg-dragon-900 text-dragon-700 dark:text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-4">
          <Contacts />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
