import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { recoverUserInformation, signInRequest } from '@services/auth';

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type signInData = {
  email: string;
  password: string;
  remember: boolean;
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
    const { 'wallet-token': token } = parseCookies();
    if (token) {
      recoverUserInformation().then(response => setUser(response.user));
    }
  }, []);

  async function signIn({ email, password, remember }: signInData) {
    const { token, user } = await signInRequest({
      email,
      password,
      remember
    });

    setCookie(undefined, 'wallet-token', token, {
      maxAge: 60 * 60 * 24 // 24 hours
    });

    setUser(user);
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
