import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <section className="py-20 px-4 h-full flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Gerencie seus contatos de forma <span className="text-dragon-primary">simples</span> e{' '}
              <span className="text-dragon-primary">eficiente</span>
            </h1>
            <p className="text-lg text-dragon-700 dark:text-zinc-300 max-w-xl">
              O PinMe é a plataforma ideal para organizar seus contatos pessoais e profissionais em
              um só lugar, com localização no mapa e acesso rápido às informações.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/signup"
                className="px-6 py-3 bg-dragon-primary rounded-md text-white font-medium hover:bg-dragon-primary/80 transition-colors"
              >
                Começar agora
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full h-[400px] bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202025-05-18%20a%CC%80s%2020.23.27-v9i66oHukTbvEX8w8LztElAT9gOcwI.png"
                alt="Interface do PinMe - Gerenciador de Contatos"
                className="w-full h-full object-contain"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500 rounded-full blur-[100px] opacity-30"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
