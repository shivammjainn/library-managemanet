'use client';

import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import { User } from "@/provider/types/types";

export default function useCustomAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user,setUser]=useState<User|null>(null);
    const [isAdmin,setIsAdmin]=useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      const decoded = jwt.decode(token) as {username: string;admin:boolean; exp: number } | null;
      const now = Math.floor(Date.now() / 1000);
      if (decoded && decoded.exp > now) {
        setIsAuthenticated(true);
        setUser({ username: decoded.username, admin: decoded.admin });
        setIsAdmin(decoded.admin);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null)
      }
    } catch {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null)
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, isAuthenticated,user,isAdmin };
}
