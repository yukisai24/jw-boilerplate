import { useQuery } from '@tanstack/react-query';

import {
  CoinQueryParams,
  CryptoAPI,
} from '@/config/CryptoAPI';
import httpClient from '@/config/httpClient';

const Controller = new CryptoAPI(httpClient);

export const useGetCoins = ({
  queryParams,
  enabled = true,
}: {
  queryParams: CoinQueryParams;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ['coins', queryParams],
    queryFn: () => Controller.getCoins(queryParams),
    enabled: enabled,
  });
};
