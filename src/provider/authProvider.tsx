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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        if (pathname !== '/login') {
          router.push('/login');
        }
        return setLoading(false);
      }

      try {
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
      } catch (error) {
        localStorage.removeItem('token');
        if (pathname !== '/login') {
          router.push('/login');
        }
      } finally {
        setLoading(false); // ✅ Always hide spinner after everything
      }
    };

    checkToken();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
