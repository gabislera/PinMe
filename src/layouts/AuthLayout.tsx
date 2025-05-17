import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-full flex flex-col ">
      <header className="border border-white/20 shadow-sm py-6 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">PinMe</span>
          </Link>

          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 hover:text-white/80border  text-white text-sm">
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary hover:opacity-80 transition-all duration-300 text-white rounded-md text-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};
