import { useSuspenseQuery } from '@tanstack/react-query';
import { libraryApi } from '../api/libraryApi';

export const useLibrarySearch = (query: string, page: number) => {
  return useSuspenseQuery({
    queryKey: ['library', query, page],
    queryFn: () => libraryApi.searchImages(query, page)
  });
};
