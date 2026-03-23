import axios from 'axios';
import { parseCookies } from 'nookies';

// URL do SEU backend — nunca expõe o servidor do jogo ao frontend
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3030/intersect';

export function getAPIClient(ctx?: any) {
  const { 'nextauth-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
