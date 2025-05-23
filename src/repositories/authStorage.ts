export const USERS_KEY = 'users';
export const CURRENT_USER_KEY = 'session_id';

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AuthSession = {
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

export function getUserIdFromToken(token: string): string | null {
  try {
    const [userId] = token.split('_');
    return userId;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  try {
    const [, expirationTime] = token.split('_');
    const expirationMs = parseInt(expirationTime) * 1000;
    return expirationMs > Date.now();
  } catch {
    return false;
  }
}

export function updateUserPassword(userId: string, newPassword: string): boolean {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) return false;

  users[userIndex].password = newPassword;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}
