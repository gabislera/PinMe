import {
  clearSession,
  findUserById,
  getSession,
  getUsers,
  saveUsers,
} from '../../repositories/authStorage';
import { getUserIdFromToken } from '../auth/tokenService';

export const deleteUserService = (password: string) => {
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

  if (user.password !== password) {
    throw new Error('Senha inválida');
  }

  const users = getUsers();
  const updatedUsers = users.filter(u => u.id !== userId);
  saveUsers(updatedUsers);

  clearSession();
};
