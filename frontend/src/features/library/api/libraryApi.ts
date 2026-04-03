import { apiClient } from '@/lib/api/apiClient';
import type { ApiSuccessResponse, ImageSearchDto } from '~types/api';

export const libraryApi = {
  searchImages: async (query: string, page = 1): Promise<ImageSearchDto> => {
    const { data } = await apiClient.get<ApiSuccessResponse<ImageSearchDto>>('/api/v1/images/search', {
      params: { q: query, page, mediaType: 'image' }
    });

    return data.data;
  }
};
