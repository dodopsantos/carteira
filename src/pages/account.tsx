import { useContext } from 'react';
import Account from '@modules/account';
import Layout from '@components/layout';
import { GetServerSideProps } from 'next';
import { AuthContext } from '@contexts/AuthContext';
import { parseCookies } from 'nookies';
import { getAPIClient } from '@services/axios';

export type Character = {
  Name: string;
  Level: number;
};

export type CharactersResponse = {
  user: string;
  characters: Character[];
};

export default function AccountPage({ characters }): JSX.Element {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div>
      <main>
        {/* <Layout> */}
        <Account user={user} characters={characters} />
        {/* </Layout> */}
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

  const api = getAPIClient(ctx);

  try {
    const response = await api.get<CharactersResponse>(
      '/users/admin/characters'
    );

    return {
      props: {
        characters: response.data.characters
      }
    };

  } catch (error) {
    console.error('Erro ao buscar characters:', error);

    return {
      props: {
        characters: []
      }
    };
  }
};

