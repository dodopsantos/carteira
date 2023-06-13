import React from 'react';
import Homepage from '@modules/homepage';
import Layout from '@components/layout';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { getAPIClient } from '@services/axios';

export default function Home({ rank }: any): JSX.Element {
  return (
    <div>
      <main>
        <Layout>
          <Homepage rank={rank} />
        </Layout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth-token']: token } = parseCookies(ctx);
  const api = getAPIClient(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  // const { data: rank } = await api.get('/v1/players/rank');

  return {
    props: {
      rank: null
    }
  };
};
