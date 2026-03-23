import { useContext } from 'react';
import Account from '@modules/account';
import { GetServerSideProps } from 'next';
import { AuthContext } from '@contexts/AuthContext';
import { getAPIClient } from '@services/axios';
import { validateTokenSSR } from '@services/auth';

export type Character = {
  Id: string;
  Name: string;
  Level: number;
  Exp: number;
  ExperienceToNextLevel: number;
  StatPoints: number;
  Sprite: string;
  Face: string;
  Dir: 0 | 1 | 2 | 3;
  Vitals: [number, number];
  MaxVitals: [number, number];
  BaseStats: [number, number, number, number, number];
  StatPointAllocations: [number, number, number, number, number];
  Gender: number;
  Dead: boolean;
  LastOnline: string;
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
  // 1. Valida JWT — redireciona para login se inválido ou expirado
  const validUser = await validateTokenSSR(ctx);
  if (!validUser) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const api = getAPIClient(ctx);

  // 2. Servidor offline → home com toast
  try {
    const serverRes = await api.get('/server/status');
    if (serverRes.data?.online !== true) {
      return { redirect: { destination: '/?maintenance=1', permanent: false } };
    }
  } catch {
    return { redirect: { destination: '/?maintenance=1', permanent: false } };
  }

  // 3. Busca personagens
  try {
    const response = await api.get<CharactersResponse>('/users/me/characters');
    return { props: { characters: response.data.characters ?? [] } };
  } catch {
    return { props: { characters: [] } };
  }
};
