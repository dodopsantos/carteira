import axios from 'axios';
import { parseCookies } from 'nookies';
import https from 'https';

const SERVER_URl = 'http:/localhost:3030/intersect';//'https://4.201.57.73:5443/api';

export function getAPIClient(ctx?: any) {
  const { 'nextauth-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: SERVER_URl,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}

// export function getAPIPublic() {
//   // const { 'nextauth-token': token } = parseCookies();

//   const api = axios.create({
//     baseURL: SERVER_URl
//   });

//   api.interceptors.request.use(config => {
//     // console.log(config);
//     return config;
//   });

//   // let token =
//   //   'f1vHOUeqynFbc9-9bDquFBtaBWDYiigfnyyBV7-sp6YeD8hYB7hZV9p9C2zbe72wLq6aAz7mifNnsYT15DvTB6w5qBmffulhukSlAINavf3haWwSUNhcjphD89WV1s5NoOTOYRAyDr5Vez-FZv4ofCFCk4bX0kKORF6T4FvMjbyuVm0sxV3u3D_-cFoHj5RNSA4LvWsNpeEQa8_xklQ5AwtTz9mZA9Upkmx8vwV8Az_DbOughEyIzbPpaKtGCZcD3blIPPMVmh1a7S1v5O9nVBdW05bLjUO-ATztts8fPIFKg_pZD9-kTE_EwS857feT_pBS8yMPt2x7lXkLs-5CwCM7_4zXcwUZFw7nTKcMtMGBd385QbzXmELKFhGIfIadhT2Fn6HKpgkfTrYqwxbFlzrwfF-sufpN3rGXVp87ms3wTIRDTL1ax_0Yqd5EvALl28zQkaqwimZKjCX5paMtckpPdGJzE2pwQvwl3twZ4hOiJOJ0mFACDYEShLxkbN5cj5UzgHhWdWVaNanmrzKHKM5R4XuQzNWdEY9jqm-PXNNPi7YMw1ZApLFANR9X7vsULL7N2r1tzRcwpNhkInYbPVa_NduE1cULCZbd6lTfd6LQxNncxblsu3Fn6oueqvVUvxhI-upEiGIgeQbk5xTDF5i7hRJ5qtC0-CNP1WrSR-DnlXou7VvceEpUgWGUNdkX';

//   api.defaults.headers['Authorization'] = `Bearer ${token}`;

//   return api;
// }
