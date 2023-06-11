import React from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import { Login } from '@modules/login';
import { getAPIClient } from '@services/axios';

export default function LoginPage(): JSX.Element {
  const { signIn } = useContext(AuthContext);

  return (
    <div>
      <main>
        <Login signIn={signIn} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth-token']: token } = parseCookies(ctx);
  const api = getAPIClient(ctx);

  const res = await api.post('/oauth/token', {
    grant_type: 'password',
    username: 'admin',
    password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
  });

  setCookie(ctx, 'nextauth-token', res?.data?.access_token, {
    maxAge: res?.data?.expires_in
  });

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
