'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';

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
