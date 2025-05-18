import type { SignInSchema } from '../../pages/auth/SignIn';
import { findUserByEmail, setCurrentUser } from '../../repositories/authStorage';

export function signInService(data: SignInSchema) {
  const user = findUserByEmail(data.email);
  if (!user || user.password !== data.password) {
    throw new Error('E-mail ou senha inválidos');
  }

  const token = crypto.randomUUID();
  setCurrentUser({ userId: user.id, token });
}
