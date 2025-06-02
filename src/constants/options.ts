import { IOption } from '@/types/common';

export const arrayToOptions = (array: string[]) => {
  return array.map((item) => ({
    label: item,
    value: item,
  }));
};

export const EHttpStatusCode = {
  200: 'Successful',
  201: 'Created',
  202: 'Accepted',
  301: 'Moved Permanently',
  303: 'See Other',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  405: 'Method not Allowed',
  500: 'Internal Server Error',
  501: 'Not Implenmented',
  503: 'Service Unavailable',
};

export const inUseOptionsApiUsagePolicy: IOption<string>[] = [
  { value: 'limit', label: '제한' },
  { value: 'No limit', label: '제한없음' },
];
