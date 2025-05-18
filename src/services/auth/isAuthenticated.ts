import { getCurrentUser } from '../../repositories/authStorage';

export function isAuthenticatedService(): boolean {
  const session = getCurrentUser();
  return !!session?.token;
}
