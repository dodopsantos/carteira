import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { 'nextauth-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:5400/api'
  });

  api.interceptors.request.use(config => {
    console.log(config);
    return config;
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

export function getAPIPublic() {
  const api = axios.create({
    baseURL: 'http://localhost:5400/api'
  });

  api.interceptors.request.use(config => {
    console.log(config);
    return config;
  });

  api.defaults.headers[
    'Authorization'
  ] = `Bearer WlKInqQSHtbhG5AQeTRqIEGRBdIXrea2wjW-cITnVqDtes4ATHF8WETY5n91wDDlzqyBEtItgiYH2leQxOWK-GQksHItsoKzk_HN0UsQPJP5LOGMPJ1hefxceCckZDKVQzU6ArO67v9hszDziP6HaXQ5FfZ7V7b-FYCZtlvbaYK6oiKFjgfIp4L6Ws2o3AaBgsI32oEzXCeMPs1gGaJGk5ujzRyWYbYq8nIsawg6y5U8qucx-IojC-SeLLGHcOQCDok_i64dCqxnJWggU4CcYqoTgF_1Y6tQoABAtbt_riFjl3hI4uptH6chjB4HVT89SX3TdW015BKkBnWARdEfB72p1Hu96jAHyqMA925ojIA8xFwU2dvVtFFQfo_ri-DKLwu5lkNmMNyp3R_6xpSa3eil_0e1ngPeLJqZgbsRz3Ai_Ma0BYCfIFAjD978s1FMGzaOjSti3VI8kNyZhBQqn-reGnz32icd3lg5S82k3XHd1jJf20TpD4GPpp72kkTclEfpGQ8Hnj873ROPtlZnabeZ1-_7Zz_cw911E_-4xagApSGfho1CiNOKo4v-LR1xw1jJRe-lWnMw1R5h3T2vc_GULdYmRU_4NZPfi37iw6uFgKD19_xVLogR71RkiI_2aA8hAJAjf8cterkvmMZ2gQM8IaQBvs6SmIYEwrpVBiRdo1dSN5dtp5paG2GFIWgf`;

  return api;
}
