import type { SignInSchema } from '../../pages/auth/SignIn';
import { findUserByEmail, saveSession } from '../../repositories/authStorage';
import { generateToken } from './tokenService';

export function signInService(data: SignInSchema) {
  const user = findUserByEmail(data.email);
  if (!user || user.password !== data.password) {
    throw new Error('E-mail ou senha inválidos');
  }

  const token = generateToken(user.id);
  saveSession({ token });
}
