import React, { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '@services/api';

export type User = {
  username: string;
  email: string;
  createdAt: string;
  vip: boolean;
};

type SignInData = {
  username: string;
  password: string;
  remember?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  // Recupera sessão ao carregar a página
  useEffect(() => {
    const { 'nextauth-token': token, 'nextauth-user': savedUser } = parseCookies();

    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);

        // Valida o token em segundo plano — silencioso
        api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => {
          if (res.data?.user) setUser(res.data.user);
        }).catch((err) => {
          // 401 = token expirado ou inválido → signOut automático
          if (err?.response?.status === 401) {
            signOut();
          }
        });
      } catch {
        signOut();
      }
    }
  }, []);

  async function signIn({ username, password, remember }: SignInData) {
    // Chama o BACKEND, que por sua vez autentica com o jogo
    const response = await api.post('/auth/login', { username, password });

    const { token, expiresIn, user: userData } = response.data;

    if (!token) {
      throw new Error('Token não retornado.');
    }

    const maxAge = remember ? 60 * 60 * 24 * 30 : (expiresIn > 0 ? expiresIn : 86400);

    // Salva token
    setCookie(undefined, 'nextauth-token', token, { maxAge, path: '/' });

    // Salva dados do usuário (evita precisar chamar /auth/me a cada refresh)
    setCookie(undefined, 'nextauth-user', JSON.stringify(userData), { maxAge, path: '/' });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(userData);
    Router.push('/account');
  }

  function signOut() {
    destroyCookie(undefined, 'nextauth-token', { path: '/' });
    destroyCookie(undefined, 'nextauth-user', { path: '/' });
    delete api.defaults.headers['Authorization'];
    setUser(null);
    Router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
