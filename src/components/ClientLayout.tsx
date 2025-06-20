'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
