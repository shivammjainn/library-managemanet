'use client'

import { ReactNode } from 'react';
import Header from './Header';
import LoginPage from './Login/LoginPage';
import useCustomAuth from '@/hooks/useCustomAuth';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const {loading,isAuthenticated}=useCustomAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
