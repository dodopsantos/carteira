import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Homepage from '@modules/homepage';
import Layout from '@components/layout';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Toast } from '@components/Toast';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [showMaintenance, setShowMaintenance] = useState(false);

  useEffect(() => {
    if (router.query.maintenance === '1') {
      setShowMaintenance(true);
      // Limpa o query param da URL sem recarregar a página
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.query.maintenance]);

  return (
    <div>
      {showMaintenance && (
        <Toast
          type="warning"
          message="O servidor está em manutenção. Tente novamente mais tarde."
          onClose={() => setShowMaintenance(false)}
        />
      )}
      <main>
        <Layout footer>
          <Homepage />
        </Layout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth-token']: token } = parseCookies(ctx);

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
