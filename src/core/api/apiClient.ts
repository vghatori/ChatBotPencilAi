
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { Result } from '../../types/api';


const baseUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});


class APIClient {
  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  patch<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'patch' });
  }

  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<unknown, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }

  setBaseUrl(baseUrl: string) {
    axiosInstance.defaults.baseURL = baseUrl;
  }
}
const apiClient = new APIClient();
export default apiClient;
