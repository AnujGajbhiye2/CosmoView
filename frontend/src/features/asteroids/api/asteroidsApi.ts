import { apiClient } from '@/lib/api/apiClient';
import type { ApiSuccessResponse, AsteroidFeedDto } from '~types/api';

export const asteroidsApi = {
  getFeed: async (startDate: string, endDate: string): Promise<AsteroidFeedDto> => {
    const { data } = await apiClient.get<ApiSuccessResponse<AsteroidFeedDto>>('/api/v1/asteroids/feed', {
      params: { startDate, endDate }
    });

    return data.data;
  }
};
