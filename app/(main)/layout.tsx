import { ReactNode } from 'react';

import Header from '@/components/Header';

/**
 * Layout for main pages using the default theme
 * Applied to: home, admin, live, etc.
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-300 flex-1 flex-col px-4 pb-4">
        <Header />
        <div className="border-secondary border bg-white p-5">{children}</div>
      </div>
      <footer className="p-2 text-right">
        <a
          href="https://www.gocosmic.dev/"
          rel="noopener noreferrer"
          target="_blank"
          className="text-xs font-bold text-white underline opacity-80 transition-colors hover:text-blue-950"
          aria-label="Go Cosmic - Créateur de ce projet (lien externe)"
        >
          Par Go Cosmic
        </a>
      </footer>
    </div>
  );
}
