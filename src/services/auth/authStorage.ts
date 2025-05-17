const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

export type StoredUser = {
  email: string;
  password: string;
};

export function getUsers(): StoredUser[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function createUser(user: StoredUser) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return getUsers().find(user => user.email === email);
}

export function setCurrentUser(email: string) {
  localStorage.setItem(CURRENT_USER_KEY, email);
}

export function getCurrentUser(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
