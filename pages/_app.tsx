import App from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import Layout from '@/components/Layout';
import theme from '@/styles/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
      </ThemeProvider>
    );
  }
}

export default MyApp;
