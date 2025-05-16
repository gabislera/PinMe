import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 ">
      <div className="flex flex-col items-center gap-4 w-full max-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-lg">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold text-white">Acesse sua conta</h1>
          <p className="text-muted text-center">Informe seus dados para continuar.</p>
        </div>

        <form className="flex flex-col gap-2 w-full mt-4">
          <Input label="Email" placeholder="exemplo@email.com" type="email" />
          <Input label="Password" placeholder="********" type="password" />
          <Button title="Entrar" type="submit" className="mt-4" />
        </form>

        <span className="text-muted text-sm text-center">
          Ainda não tem uma conta?{' '}
          <a
            href="/register"
            className="text-tertiary hover:text-secondary transition-colors duration-300 font-bold"
          >
            Crie agora
          </a>
        </span>
      </div>
    </div>
  );
};
