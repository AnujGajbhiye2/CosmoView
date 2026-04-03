import { useSuspenseQuery } from '@tanstack/react-query';
import { apodApi } from '../api/apodApi';

export const useApod = (date: string) => {
  return useSuspenseQuery({
    queryKey: ['apod', date],
    queryFn: () => apodApi.getApod(date)
  });
};
