import { getCurrentUser, isTokenValid } from '../../repositories/authStorage';

export function isAuthenticatedService(): boolean {
  const session = getCurrentUser();
  if (!session?.token) return false;

  return isTokenValid(session.token);
}
