'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { User, AuthContextType } from '@/provider/types/types';


const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log(token)
    if (!token) {
      if (pathname !== '/login') {
        router.push('/login');
      }
      return;
    }

    const decoded = jwt.decode(token) as { username: string; admin: boolean; exp: number } | null;
    const now = Math.floor(Date.now() / 1000);

    if (decoded && decoded.exp > now) {
      setUser({ username: decoded.username, admin: decoded.admin });
    } else {
      localStorage.removeItem('token');
      setUser(null);

      if (pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
