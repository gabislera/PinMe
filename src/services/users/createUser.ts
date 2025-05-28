import type { SignUpSchema } from '../../pages/auth/SignUp';
import { findUserByEmail, getUsers, saveUsers } from '../../repositories/authStorage';

export function createUserService(data: SignUpSchema) {
  const userExists = findUserByEmail(data.email);
  if (userExists) {
    throw new Error('E-mail já cadastrado');
  }

  const users = getUsers();
  const newUser = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    password: data.password,
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
}
