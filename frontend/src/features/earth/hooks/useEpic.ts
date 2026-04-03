import { useSuspenseQuery } from '@tanstack/react-query';
import { epicApi } from '../api/epicApi';

export const useEpic = (date: string) => {
  return useSuspenseQuery({
    queryKey: ['epic', date],
    queryFn: () => epicApi.getNaturalImages(date)
  });
};
