import './globals.css';
import { ReactNode } from 'react';
import Layout from '@/components/Layout';
import ClientProviders from './providers';

export const metadata = {
  icons: {
    icon: '/static/Favicon.jpg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ClientProviders>
          <Layout>{children}</Layout>
        </ClientProviders>
      </body>
    </html>
  );
}
