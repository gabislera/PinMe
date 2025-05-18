import {
  getCurrentUser,
  getUsers,
  USERS_KEY,
  CURRENT_USER_KEY,
  getUserIdFromToken,
} from '../../repositories/authStorage';

export const deleteUserService = (password: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuário não autenticado');
  }

  const userId = getUserIdFromToken(currentUser.token);
  if (!userId) {
    throw new Error('Token inválido');
  }

  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }

  if (users[userIndex].password !== password) {
    throw new Error('Senha inválida');
  }

  users.splice(userIndex, 1);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  localStorage.removeItem(CURRENT_USER_KEY);
};
