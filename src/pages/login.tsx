import React from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import { Login } from '@modules/login';

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
  const { ['wallet-token']: token } = parseCookies(ctx);

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
