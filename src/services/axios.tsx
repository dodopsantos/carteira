import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { 'nextauth-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:5400/api'
  });

  api.interceptors.request.use(config => {
    return config;
  });

  if (token) {
    console.log('tokens', token);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
