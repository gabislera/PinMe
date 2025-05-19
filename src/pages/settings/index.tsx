import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { DeleteAccountModal } from '../../components/DeleteAccountModal';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { showToast } from '../../utils/toast';

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Senha atual é obrigatória' }),
    newPassword: z.string().min(6, { message: 'Nova senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type UpdatePasswordSchema = z.infer<typeof passwordChangeSchema>;

export const Settings = () => {
  const { getUserData, changePassword } = useAuth();
  const user = getUserData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: UpdatePasswordSchema) => {
    try {
      changePassword(data);
      reset();
      showToast('Senha alterada com sucesso!', { type: 'success' });
    } catch (error) {
      showToast(String(error), { type: 'error' });
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <Link to="/" className="text-dragon-700 dark:text-white flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        <span>Voltar</span>
      </Link>
      <div className="mx-auto w-full p-6 bg-white dark:bg-dragon-800 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-dragon-800 dark:text-white">
          Configurações da Conta
        </h1>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-dragon-700 dark:text-dragon-300">
              Informações Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dragon-600 dark:text-dragon-400">
                  Nome
                </label>
                <div className="p-3 bg-dragon-100 dark:bg-dragon-700 rounded-md">{user?.name}</div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dragon-600 dark:text-dragon-400">
                  E-mail
                </label>
                <div className="p-3 bg-dragon-100 dark:bg-dragon-700 rounded-md">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium text-dragon-700 dark:text-dragon-300">
              Alterar Senha
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Senha Atual"
                type="password"
                variant="outlined"
                {...register('currentPassword')}
                error={errors.currentPassword}
              />

              <Input
                label="Nova Senha"
                type="password"
                variant="outlined"
                {...register('newPassword')}
                error={errors.newPassword}
              />

              <Input
                label="Confirmar Nova Senha"
                type="password"
                variant="outlined"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
              />

              <div className="flex justify-between w-full !mt-10">
                <Button
                  type="submit"
                  title={isSubmitting ? 'Alterando...' : 'Alterar Senha'}
                  isLoading={isSubmitting}
                />

                <Button
                  type="button"
                  title="Excluir Conta"
                  variant="danger"
                  onClick={handleDeleteAccount}
                />
              </div>
            </form>
          </div>
        </div>

        <DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
      </div>
    </div>
  );
};
