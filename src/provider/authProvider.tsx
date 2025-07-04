'use client';
import {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { AuthContextType } from '@/provider/types/types';
import useCustomAuth from '@/hooks/useCustomAuth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin } = useCustomAuth();
  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
