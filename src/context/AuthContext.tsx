import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { SignUpSchema } from '../pages/auth/SignUp';
import type { SignInSchema } from '../pages/auth/SignIn';
import type { UpdatePasswordSchema } from '../pages/settings';
import type { DeleteAccountSchema } from '../components/DeleteAccountModal';
import {
  clearSession,
  findUserById,
  getSession,
  type StoredUser,
} from '../repositories/authStorage';
import { getUserIdFromToken } from '../services/auth/tokenService';
import { updatePasswordService } from '../services/users/updatePassword';
import { createUserService } from '../services/users/createUser';
import { signInService } from '../services/auth/signIn';
import { isAuthenticatedService } from '../services/auth/isAuthenticated';
import { deleteUserService } from '../services/users/deleteUser';

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
  deleteAccount: (data: DeleteAccountSchema) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAuthenticatedService());
  }, []);

  function signUp(data: SignUpSchema) {
    createUserService(data);
  }

  function signIn(data: SignInSchema) {
    signInService(data);
    setIsAuthenticated(true);
  }

  function signOut() {
    clearSession();
    setIsAuthenticated(false);
  }

  function getUserData(): StoredUser | null {
    const session = getSession();
    if (!session) return null;

    const userId = getUserIdFromToken(session.token);
    if (!userId) return null;

    return findUserById(userId) || null;
  }

  function changePassword(data: UpdatePasswordSchema): boolean {
    return updatePasswordService(data);
  }

  function deleteAccount(data: DeleteAccountSchema) {
    deleteUserService(data.password);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        getUserData,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
