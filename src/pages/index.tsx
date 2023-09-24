import React from 'react';
import Homepage from '@modules/homepage';
import Layout from '@components/layout';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { getAPIClient } from '@services/axios';

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  // const { ['nextauth-token']: token } = parseCookies(ctx);

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   };
  // }

  return {
    props: {}
  };
};
