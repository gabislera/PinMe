import type { SignInSchema } from '../../pages/auth/SignIn';
import type { SignUpSchema } from '../../pages/auth/SignUp';
import {
  findUserByEmail,
  createUser,
  setCurrentUser,
  isAuthenticated as checkAuth,
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

export function isAuthenticated(): boolean {
  return checkAuth();
}
