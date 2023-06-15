/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html title="Sword of Fate" lang="pt">
        <Head>
          <meta
            name="description"
            content="Sword of Fate é um jogo de RPG em 2d baseado no universo do anime Bleach"
          />
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/bleachLogo.webp" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
