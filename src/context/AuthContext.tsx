import { createContext, useEffect, useState, type ReactNode } from 'react';
import * as authService from '../services/auth/authService';
import type { SignUpSchema } from '../pages/auth/SignUp';
import type { SignInSchema } from '../pages/auth/SignIn';
import type { UpdatePasswordSchema } from '../pages/settings';
import { getCurrentUser, getUsers, type StoredUser } from '../services/auth/authStorage';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  signUp: (data: SignUpSchema) => void;
  signIn: (data: SignInSchema) => void;
  signOut: () => void;
  getUserData: () => StoredUser | null;
  changePassword: (data: UpdatePasswordSchema) => boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  function signUp(data: SignUpSchema) {
    authService.signUp(data);
  }

  function signIn(data: SignInSchema) {
    authService.signIn(data);
    setIsAuthenticated(true);
  }

  function signOut() {
    authService.signOut();
    setIsAuthenticated(false);
  }

  function getUserData(): StoredUser | null {
    const session = getCurrentUser();
    if (!session) return null;

    const users = getUsers();
    const user = users.find(item => item.id === session.userId);
    return user || null;
  }

  // No AuthContext (simplifique a função changePassword)
  // No AuthContext
  function changePassword(data: UpdatePasswordSchema): boolean {
    return authService.changePassword(data);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signUp, signIn, signOut, getUserData, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
