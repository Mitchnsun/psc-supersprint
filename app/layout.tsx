import './globals.css';

import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

import Layout from '@/components/Layout';

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className={poppins.className}>
        <ClientProviders>
          <Layout>{children}</Layout>
        </ClientProviders>
      </body>
    </html>
  );
}
