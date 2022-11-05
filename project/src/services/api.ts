import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { apiErrorHandler } from './api-error-handler';
import { getToken } from './token';

const URL = 'https://10.react.pages.academy/wtw';
const timeout = 5000;

type ErrorObject = {
  error: string;
}

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

  api.interceptors.response.use((response) => response, (error: AxiosError) => {
    if (error.response) {
      const message = (error.response.data as ErrorObject).error;
      apiErrorHandler(message);
    }

    throw error;
  });

  return api;
};
