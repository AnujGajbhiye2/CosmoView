import { useSuspenseQuery } from '@tanstack/react-query';
import { asteroidsApi } from '../api/asteroidsApi';

export const useAsteroidFeed = (startDate: string, endDate: string) => {
  return useSuspenseQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => asteroidsApi.getFeed(startDate, endDate)
  });
};
