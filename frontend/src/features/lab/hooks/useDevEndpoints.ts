import { useSuspenseQuery } from '@tanstack/react-query';
import { devApi } from '../api/devApi';

export const useDevEndpoints = () => {
  return useSuspenseQuery({
    queryKey: ['dev', 'endpoints'],
    queryFn: () => devApi.getEndpoints()
  });
};
