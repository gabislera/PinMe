import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './Input';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const deleteAccountSchema = z.object({
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
    mode: 'onBlur',
  });

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onConfirm = (data: DeleteAccountSchema) => {
    try {
      deleteAccount(data);
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dragon-800 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold text-dragon-800 dark:text-white mb-4">Excluir Conta</h3>
        <p className="text-dragon-600 dark:text-dragon-400 mb-6">
          Esta ação é irreversível. Por favor, digite sua senha para confirmar a exclusão da conta.
        </p>

        <form onSubmit={handleSubmit(onConfirm)} className="space-y-4">
          <Input
            label="Senha"
            type="password"
            variant="outlined"
            {...register('password')}
            error={errors.password}
          />

          <div className="flex justify-between space-x-4 mt-6">
            <Button
              type="button"
              title="Cancelar"
              className="bg-dragon-400 hover:bg-dragon-500"
              onClick={handleClose}
            />
            <Button
              type="submit"
              title={isSubmitting ? 'Excluindo...' : 'Confirmar Exclusão'}
              className="bg-dragon-danger hover:bg-dragon-danger/80"
              isLoading={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
