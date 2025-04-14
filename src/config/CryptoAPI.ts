import { ContentType, HttpClient } from './axiosInstance';

export type CoinQueryParams = {
  vs_currency: string;
  order?: string;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
};
export class CryptoAPI<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }
  getCoins = (queryParams: CoinQueryParams) =>
    this.http.request({
      path: '/coins/markets',
      method: 'GET',
      type: ContentType.Json,
      query: queryParams,
    });
}
