import type { SignUpSchema } from '../../pages/auth/SignUp';
import { createUser, findUserByEmail } from '../../repositories/authStorage';

export function createUserService(data: SignUpSchema) {
  const userExists = findUserByEmail(data.email);
  if (userExists) {
    throw new Error('E-mail já cadastrado');
  }

  createUser({ name: data.name, email: data.email, password: data.password });
}
