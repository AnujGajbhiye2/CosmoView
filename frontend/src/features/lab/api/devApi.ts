import { apiClient } from '@/lib/api/apiClient';
import type { ApiSuccessResponse, DevEndpointsDto } from '~types/api';

export const devApi = {
  getEndpoints: async (): Promise<DevEndpointsDto> => {
    const { data } = await apiClient.get<ApiSuccessResponse<DevEndpointsDto>>('/dev/endpoints');
    return data.data;
  }
};
