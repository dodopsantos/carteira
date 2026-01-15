import React, { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { sha256 } from 'js-sha256';
import Router from 'next/router';

import { recoverUserInformation } from '@services/auth';
import { api } from '@services/api';

export type User = {
  username: string;
  email: string;
  createdAt: string;
  vip: boolean;
};

type SignInData = {
  password: string;
  username: string;
  remember?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth-token': token } = parseCookies();
    if (token) {
      recoverUserInformation().then(response => setUser(response.user));
    }
  }, []);

  async function signIn({ password, username, remember }: SignInData) {
    try {
      const response = await api.post('/oauth/token', {
        grant_type: 'password',
        username,
        password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'//sha256(password)
      });

      const token = response?.data?.access_token;
      const expiresIn = Number(response?.data?.expires_in ?? 0);

      if (!token) {
        const error: any = new Error('Token não retornado pela API.');
        error.response = { data: { message: 'Falha ao autenticar. Tente novamente.' } };
        throw error;
      }

      const thirtyDays = 60 * 60 * 24 * 30;
      const maxAge = remember ? thirtyDays : (expiresIn > 0 ? expiresIn : thirtyDays);

      setCookie(undefined, 'nextauth-token', token, {
        maxAge,
        path: '/'
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/account');
    } catch (err: any) {
      const status = err?.response?.status;

      // tenta extrair a msg da API
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error_description ||
        err?.response?.data?.error ||
        null;

      // mensagens amigáveis por caso
      let friendly = apiMessage ?? 'Não foi possível autenticar. Tente novamente.';

      if (status === 400 || status === 401) {
        friendly = 'Usuário ou senha inválidos.';
      } else if (!err?.response) {
        // sem response geralmente é rede / CORS / API offline
        friendly = 'Sem conexão com o servidor. Verifique sua internet e tente novamente.';
      } else if (status >= 500) {
        friendly = 'Servidor indisponível no momento. Tente novamente mais tarde.';
      }

      // mantém o throw pra tela mostrar o erro no card
      const error: any = new Error(friendly);
      error.response = { ...err?.response, data: { ...err?.response?.data, message: friendly } };
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
