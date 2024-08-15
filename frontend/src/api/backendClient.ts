import axios from 'axios';

// TODO: da settare l'url del backend, visto che è a uso interno va bene anche un IP
export const BACKEND = process.env.NODE_ENV === 'production' ? 'http://localhost:8000' : 'http://localhost:8000';

export const backendClient = axios.create({
  baseURL: BACKEND,
  timeout: 1000,
});

backendClient.interceptors.request.use(
  (config) => {
    // lo tengo in caso ci voglia l'autorizzazione ad una certa
    // const jwtToken = localStorage.getItem(TOKEN_NAME);
    // if (jwtToken) {
    //   config.headers.Authorization = `Bearer ${jwtToken}`;
    // }
    config.url = `/api${config.url}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
