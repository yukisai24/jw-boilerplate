import { AxiosResponse } from 'axios';

import { HttpClient } from './axiosInstance';

const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_CRYPTO_BASE_URL,
});

httpClient.instance.interceptors.request.use((config) => {
  // const token = import.meta.env.VITE_BRAWL_API_KEY; // 환경 변수에서 API 키를 가져옵니다
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  if (!config.params) return config;

  if (Object.keys(config.params).length) {
    let newParams = {};

    Object.values(config.params).forEach((value) => {
      if (typeof value === 'object') {
        newParams = { ...newParams, ...value };
      } else {
        newParams = { ...newParams, value };
      }
    });

    config.params = newParams;
    config.paramsSerializer = {
      ...config.paramsSerializer,
      indexes: null,
    };
  }

  return config;
});

httpClient.instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
);

export default httpClient;
