import { apiClient } from '@/lib/api/apiClient';
import type { ApodDto, ApiSuccessResponse } from '~types/api';

export const apodApi = {
  getApod: async (date?: string): Promise<ApodDto> => {
    const { data } = await apiClient.get<ApiSuccessResponse<ApodDto>>('/api/v1/apod', {
      params: { date }
    });

    return data.data;
  }
};
