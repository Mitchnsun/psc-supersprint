import './globals.css';

import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

import ClientProviders from './providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  icons: {
    icon: '/static/favicon.png',
  },
};

/**
 * Root layout - provides base HTML structure, fonts, and providers
 * Page-specific layouts are defined in (main) and (themed) route groups
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className={poppins.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
