import {
  getCurrentUser,
  getUsers,
  USERS_KEY,
  CURRENT_USER_KEY,
} from '../../repositories/authStorage';

export const deleteUserService = (password: string) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Usuário não autenticado');
  }

  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === currentUser.userId);

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
