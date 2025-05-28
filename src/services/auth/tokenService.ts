export function generateToken(userId: string): string {
  const expirationTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day expiration
  return `${userId}_${expirationTime}`;
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
