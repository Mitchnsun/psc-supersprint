/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Layout from '../components/Layout';
import normalizeStyles from '../styles/Normalize';
import COLORS from '../styles/colors';
import theme from '../styles/theme';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
          <style jsx global>
            {normalizeStyles}
          </style>
          <style jsx global>
            {`
              body {
                font-size: 1rem;
                font-family: OpenSans, sans-serif;
                background-color: ${COLORS.PRIMARY};
              }
              @media (max-width: 450px) {
                body {
                  font-size: 0.9rem;
                }
              }
            `}
          </style>
        </Layout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
