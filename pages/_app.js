/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import App from 'next/app';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from '../components/Layout';
import normalizeStyles from '../styles/Normalize';
import COLORS from '../styles/colors';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
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
    );
  }
}

export default MyApp;
