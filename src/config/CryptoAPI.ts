import { ContentType, HttpClient } from './axiosInstance';

export class CryptoAPI<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }
  getCoins = (query) =>
    this.http.request({
      path: '/coins/markets',
      method: 'GET',
      type: ContentType.Json,
      query: query,
    });
}
