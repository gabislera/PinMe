import type { SignInSchema } from '../../pages/auth/SignIn';
import type { SignUpSchema } from '../../pages/auth/SignUp';
import type { UpdatePasswordSchema } from '../../pages/settings';
import {
  findUserByEmail,
  createUser,
  setCurrentUser,
  isAuthenticated as checkAuth,
  clearCurrentUser,
  updateUserPassword,
  getUsers,
  getCurrentUser,
} from './authStorage';

export function signUp(data: SignUpSchema) {
  const userExists = findUserByEmail(data.email);
  if (userExists) {
    throw new Error('E-mail já cadastrado');
  }

  createUser({ name: data.name, email: data.email, password: data.password });
}

export function signIn(data: SignInSchema) {
  const user = findUserByEmail(data.email);
  if (!user || user.password !== data.password) {
    throw new Error('E-mail ou senha inválidos');
  }

  const token = crypto.randomUUID();
  setCurrentUser({ userId: user.id, token });
}

export function signOut() {
  clearCurrentUser();
}

export function isAuthenticated(): boolean {
  return checkAuth();
}

export function changePassword(data: UpdatePasswordSchema): boolean {
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
