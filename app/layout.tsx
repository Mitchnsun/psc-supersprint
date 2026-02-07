import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import Layout from '@/components/Layout';
import theme from '@/styles/theme';

export const metadata = {
  icons: {
    icon: '/static/Favicon.jpg',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>{children}</Layout>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
