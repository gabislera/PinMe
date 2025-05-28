import type { UpdatePasswordSchema } from '../../pages/settings';
import { findUserById, getSession, getUsers, saveUsers } from '../../repositories/authStorage';
import { getUserIdFromToken } from '../auth/tokenService';

export function updatePasswordService(data: UpdatePasswordSchema): boolean {
  const session = getSession();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const userId = getUserIdFromToken(session.token);
  if (!userId) {
    throw new Error('Token inválido');
  }

  const user = findUserById(userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== data.currentPassword) {
    throw new Error('Senha atual incorreta');
  }

  if (data.newPassword !== data.confirmPassword) {
    throw new Error('As senhas não conferem');
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }

  users[userIndex].password = data.newPassword;
  saveUsers(users);
  return true;
}
