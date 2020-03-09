/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import App from 'next/app';
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
            @font-face {
              font-family: 'OpenSans';
              src: url('/fonts/opensans-regular-webfont.woff');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'OpenSansBold';
              src: url('/fonts/opensans-bold-webfont.woff');
              font-weight: bold;
              font-style: normal;
            }
          `}
        </style>
        <style jsx global>
          {`
            body {
              font-size: 1rem;
              font-family: OpenSans, sans-serif;
              background-color: ${COLORS.PRIMARY};
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default MyApp;
