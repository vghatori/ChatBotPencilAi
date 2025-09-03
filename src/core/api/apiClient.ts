
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { Result } from '../../types/api';


const baseUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});


class APIClient {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'patch' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
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
export default new APIClient();
