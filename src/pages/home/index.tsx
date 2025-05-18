import { Map } from '../../components/Map';

export const Home = () => {
  return (
    <div>
      <h2 className="text-2xl text-dragon-700 dark:text-white font-bold mb-4">Mapa</h2>

      <div className="w-full h-[calc(100vh-12rem)] rounded-lg border border-dragon-200 dark:border-dragon-800 bg-white dark:bg-dragon-800 overflow-hidden">
        <Map />
      </div>
    </div>
  );
};
