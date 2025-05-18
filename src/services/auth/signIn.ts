import type { SignInSchema } from '../../pages/auth/SignIn';
import { findUserByEmail, setCurrentUser } from '../../repositories/authStorage';

export function signInService(data: SignInSchema) {
  const user = findUserByEmail(data.email);
  if (!user || user.password !== data.password) {
    throw new Error('E-mail ou senha inválidos');
  }

  const token = generateToken(user.id);
  setCurrentUser({ token });
}

function generateToken(userId: string): string {
  const expirationTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day expiration
  return `${userId}_${expirationTime}`;
}
