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

export function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return getUsers().find(user => user.email === email);
}

export function findUserById(id: string): StoredUser | undefined {
  return getUsers().find(user => user.id === id);
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSession(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}
