import { apiClient } from '@/lib/api/apiClient';
import type { ApiSuccessResponse, EpicImageDto } from '~types/api';

export const epicApi = {
  getNaturalImages: async (date: string): Promise<EpicImageDto[]> => {
    const { data } = await apiClient.get<ApiSuccessResponse<EpicImageDto[]>>('/api/v1/epic/natural', {
      params: { date }
    });

    return data.data;
  }
};
