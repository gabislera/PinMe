import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
      .max(30, { message: 'Nome deve ter no máximo 30 caracteres' }),
    email: z.string().email({ message: 'Digite um email válido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    try {
      signUp(data);
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-78px)]">
      <div className="flex flex-col items-center gap-4 w-full max-w-[450px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-dragon-200 dark:border-white/20 p-8 rounded-3xl shadow-lg">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold text-dragon-700 dark:text-white">Crie sua conta</h1>
          <p className="text-dragon-500 dark:text-dragon-tertiary text-center">
            Informe seus dados para continuar.
          </p>
        </div>

        <form className="flex flex-col gap-2 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            placeholder="Seu nome"
            type="text"
            {...register('name')}
            error={errors.name}
          />
          <Input
            label="Email"
            placeholder="exemplo@email.com"
            type="email"
            {...register('email')}
            error={errors.email}
          />
          <Input
            label="Senha"
            placeholder="********"
            type="password"
            {...register('password')}
            error={errors.password}
          />
          <Input
            label="Confirmar senha"
            placeholder="********"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword}
          />
          <Button title="Cadastrar" type="submit" className="mt-4" isLoading={isSubmitting} />
        </form>

        <span className="text-dragon-500 dark:text-dragon-tertiary text-sm text-center">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="text-dragon-primary hover:text-dragon-secondary transition-colors duration-300 font-bold"
          >
            Acesse sua conta
          </Link>
        </span>
      </div>
    </div>
  );
};
