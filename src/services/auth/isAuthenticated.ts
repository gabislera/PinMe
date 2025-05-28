import { getSession } from '../../repositories/authStorage';
import { isTokenValid } from './tokenService';

export function isAuthenticatedService(): boolean {
  const session = getSession();
  if (!session?.token) return false;

  return isTokenValid(session.token);
}
