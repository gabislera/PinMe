import type { SignInSchema } from '../../pages/auth/SignIn';
import type { SignUpSchema } from '../../pages/auth/SignUp';
import { findUserByEmail, createUser, setCurrentUser, getCurrentUser } from './authStorage';

export function signUp(data: SignUpSchema) {
  const userExists = findUserByEmail(data.email);
  if (userExists) {
    throw new Error('E-mail já cadastrado');
  }

  const newUser = { email: data.email, password: data.password };
  createUser(newUser);
  setCurrentUser(data.email);
}

export function signIn(data: SignInSchema) {
  const user = findUserByEmail(data.email);
  if (!user || user.password !== data.password) {
    throw new Error('E-mail ou senha inválidos');
  }

  setCurrentUser(data.email);
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}
