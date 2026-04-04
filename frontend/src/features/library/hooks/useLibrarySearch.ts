import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { libraryApi } from '../api/libraryApi';

export const useLibrarySearch = (query: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['library', query],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => libraryApi.searchImages(query, pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined)
  });
};
