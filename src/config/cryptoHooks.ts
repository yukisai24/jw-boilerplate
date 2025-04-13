import { useQuery } from '@tanstack/react-query';

import { CryptoAPI } from '@/config/CryptoAPI';
import httpClient from '@/config/httpClient';

const Controller = new CryptoAPI(httpClient);

export const useGetCoins = (query) => {
  return useQuery({
    queryKey: ['coins'],
    queryFn: () => Controller.getCoins(query),
  });
};
