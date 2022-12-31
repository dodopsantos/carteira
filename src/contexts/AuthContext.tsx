import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { sha256 } from 'js-sha256';
import Router from 'next/router';

import { recoverUserInformation } from '@services/auth';
import { api } from '@services/api';

type User = {
  username: string;
};

type signInData = {
  password: string;
  username: string;
};

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: signInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth-token': token } = parseCookies();
    if (token) {
      recoverUserInformation().then(response => setUser(response.user));
    }
  }, []);

  async function signIn({ password, username }: signInData) {
    // const response = await api.post('/oauth/token', {
    //   grant_type: 'password',
    //   username,
    //   password: sha256(password)
    // });

    // setCookie(undefined, 'nextauth-token', response?.data?.access_token, {
    //   expires: response?.data?.expires_in
    // });

    // api.defaults.headers[
    //   'Authorization'
    // ] = `Bearer ${response?.data?.access_token}`;

    setUser({ username });
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
