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
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Volkhov:wght@700&display=swap" rel="stylesheet"/>
          <link
            rel="icon"
            href="https://patasamigas.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10551?size=xxlarge"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
