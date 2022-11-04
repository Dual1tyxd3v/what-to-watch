import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const URL = 'https://10.react.pages.academy/wtw';
const timeout = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: timeout
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if(token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
