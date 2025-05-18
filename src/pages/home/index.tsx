export const Home = () => {
  return (
    <div>
      <h2 className="text-2xl text-dragon-700 dark:text-white font-bold mb-4">Mapa</h2>

      <div className="w-full h-[calc(100vh-12rem)] rounded-lg border border-dragon-200 dark:border-dragon-800 bg-white dark:bg-dragon-800">
        <div className="flex items-center justify-center h-full text-dragon-700 dark:text-white">
          Carregando mapa...
        </div>
      </div>
    </div>
  );
};
