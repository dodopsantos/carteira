import React from 'react';
import Homepage from '@modules/homepage';
import Layout from '@components/layout';

export default function Home(): JSX.Element {
  return (
    <div>
      <main>
        <Layout>
          <Homepage />
        </Layout>
      </main>
    </div>
  );
}
