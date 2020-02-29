import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <link rel="preload" href="/fonts/opensans-regular-webfont.woff" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/opensans-bold-webfont.woff" as="font" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
