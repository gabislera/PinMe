import { z } from 'zod';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const signInSchema = z.object({
  email: z.string().email({ message: 'Digite um email válido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchema) => {
    try {
      signIn(data);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-78px)]">
      <div className="flex flex-col items-center gap-4 w-full max-w-[450px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-dragon-200 dark:border-white/20 p-8 rounded-3xl shadow-lg">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold text-dragon-700 dark:text-white">Acesse sua conta</h1>
          <p className="text-dragon-500 dark:text-dragon-tertiary text-center">
            Informe seus dados para continuar.
          </p>
        </div>

        <form className="flex flex-col gap-2 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            placeholder="exemplo@email.com"
            type="email"
            {...register('email')}
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            {...register('password')}
            error={errors.password}
          />
          <Button title="Entrar" type="submit" className="mt-4" isLoading={isSubmitting} />
        </form>

        <span className="text-dragon-500 dark:text-dragon-tertiary text-sm text-center">
          Ainda não tem uma conta?{' '}
          <Link
            to="/register"
            className="text-dragon-primary hover:text-dragon-secondary transition-colors duration-300 font-bold"
          >
            Crie agora
          </Link>
        </span>
      </div>
    </div>
  );
};
