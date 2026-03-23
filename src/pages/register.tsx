import React from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Register } from '@modules/register';

export default function RegisterPage(): JSX.Element {
  return (
    <main>
      <Register />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { 'nextauth-token': token } = parseCookies(ctx);

  // Já logado → redireciona para account
  if (token) {
    return { redirect: { destination: '/account', permanent: false } };
  }

  return { props: {} };
};
