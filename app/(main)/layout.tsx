import { ReactNode } from 'react';

import Header from '@/components/Header';

/**
 * Layout for main pages using the default theme
 * Applied to: home, admin, live, etc.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary min-h-screen">
      <div className="mx-auto max-w-300 px-4 pb-4">
        <Header />
        <div className="border-secondary border bg-white p-5">{children}</div>
        <footer className="mt-2 text-center">
          <a
            href="https://www.gocosmic.dev/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-[10px] text-white opacity-40"
          >
            Par Gocosmic
          </a>
        </footer>
      </div>
    </div>
  );
}
