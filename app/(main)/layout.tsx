import { ReactNode } from 'react';

import Header from '@/components/Header';

/**
 * Layout for main pages using the default theme
 * Applied to: home, admin, live, etc.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary min-h-screen">
      <div className="mx-auto max-w-300 p-4">
        <Header />
        <div className="border-secondary border bg-white p-5">{children}</div>
      </div>
    </div>
  );
}
