'use client'
import { ReactNode } from 'react';
import Header from './header';
import LoginPage from './login/login-page';
import useCustomAuth from '@/hooks/useCustomAuth';
import SideBar from './sidebar/side-bar';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useCustomAuth();
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
      <div className='flex'>
        <div className='border-r-1 w-1/12'>
          <SideBar />
        </div>
        <div className='w-full h-screen'>
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
