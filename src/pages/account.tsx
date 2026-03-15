import { useContext } from 'react';
import Account from '@modules/account';
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

  return <Account user={user} characters={characters} />;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = getAPIClient(ctx);

  // Verifica status do servidor antes de permitir acesso
  try {
    const serverRes = await api.get('/server/status');
    const isOnline = serverRes.data?.online === true;

    if (!isOnline) {
      return {
        redirect: {
          destination: '/?maintenance=1',
          permanent: false,
        },
      };
    }
  } catch {
    // Se não conseguiu contactar a API, considera offline
    return {
      redirect: {
        destination: '/?maintenance=1',
        permanent: false,
      },
    };
  }

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   };
  // }

  try {
    const { ['nextauth-token']: token } = parseCookies(ctx);
    const response = await api.get<CharactersResponse>('/users/admin/characters');

    return {
      props: {
        characters: response.data.characters,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar characters:', error);

    return {
      props: {
        characters: [],
      },
    };
  }
};
