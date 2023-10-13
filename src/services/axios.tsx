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

  let token =
    'Kv5LjBeQxEZO9m9DjOp_fXZoAeJ-1j8R1fbLYg6pbZDOAY60uLO5A8AANf652LHbc2QrOdBB1cIc_2QFTLD7SI7nOQlVtf6mgZYvUvbcc2z16RN5VW0zNJUnzYXFdNYLPqBFrD5ZZwgWvXhBWCdqnAfiDjckECxvxTNmPzn2KcqfHLf3aRDy4Nn62EYutCNGkE5F067aN_WdRqIM_vefijW7QlMzvp1DkLFrxE7rYQlRJlfbJwJxPaE8jwRLRYRMhSy1gZuQc4kJpUdGlAT9UG344O0SD0mGHO6Wh7pzzWsaHkncOG2_coP_vaUpXVnem-SZiP9NBlUqRncY4Ly0dIyg9zNRLd0Il9U7FbFbuvUmuAi9Dl9ZO4JmsZSrSdzmQR9q5WaCK4c-vEHL3bma-6hSPak37k-pkJj7Zo_VCuTwiGQRx2w_b-RnS-bVc01bZuxQb-qGbV8FKvABtlQ4-j2iHZDQU4tHzTfER61ImYSVrCF-W26Wg8YKPQvugM29xjbA5an5b5jOYzzYzcA4-X2ATQeY87grC_6T-NwayEuPMy-OVwIS4ySqQj-_m3cd18nfGAxxirJUpe8KXTEpD87sOfQeWX-5XSje7bjQ6UZ4Q6TzRBxAhro26gcdI7k-9yhrn_hX-p-fWXjOyK-DZ21sEYQ0psK2YM1u5gLXwSZJL4rdLXpCgEdI-LH2qj6-';

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  return api;
}
