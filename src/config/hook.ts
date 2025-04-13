import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import httpClient from '@/config/httpClient';

import { Service } from './Service';

const Controller = new Service(httpClient);

export const useGetBrawlers = () => {
  return useQuery({
    queryKey: ['brawlers'],
    queryFn: async () => {
      return await Controller.brawlers();
    },
  });
};
