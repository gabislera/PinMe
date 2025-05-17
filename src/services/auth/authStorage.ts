const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AuthSession = {
  userId: string;
  token: string;
};

export function getUsers(): StoredUser[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function createUser(user: Omit<StoredUser, 'id'>) {
  const users = getUsers();
  const newUser = { id: crypto.randomUUID(), ...user };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return getUsers().find(user => user.email === email);
}

export function setCurrentUser(session: AuthSession) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(session));
}

export function getCurrentUser(): AuthSession | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function isAuthenticated(): boolean {
  const session = getCurrentUser();
  return !!session?.token;
}
