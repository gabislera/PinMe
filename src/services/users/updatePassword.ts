import type { UpdatePasswordSchema } from '../../pages/settings';
import { getCurrentUser, getUsers, updateUserPassword } from '../../repositories/authStorage';

export function updatePasswordService(data: UpdatePasswordSchema): boolean {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuário não autenticado');
  }

  const users = getUsers();
  const user = users.find(user => user.id === currentUser.userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== data.currentPassword) {
    throw new Error('Senha atual incorreta');
  }

  return updateUserPassword(user.id, data.newPassword);
}
