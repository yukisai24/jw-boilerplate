import { ContentType, HttpClient } from './axiosInstance';

export class Service<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }
  brawlers = () =>
    this.http.request({
      path: '/brawler',
      method: 'GET',
      type: ContentType.Json,
    });
  brawler = (id: string) =>
    this.http.request({
      path: `/brawler/${id}/info`,
      method: 'GET',
      type: ContentType.Json,
    });
  brawlerSummary = () =>
    this.http.request({
      path: '/brawler/summary',
      method: 'GET',
      type: ContentType.Json,
    });

  healthCheck = () =>
    this.http.request({
      path: '/api/health',
      method: 'GET',
      type: ContentType.Json,
    });
}
