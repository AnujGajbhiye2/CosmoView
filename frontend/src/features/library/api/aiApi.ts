import { apiClient } from '@/lib/api/apiClient';
import type { AiMissionBriefDto, ApiSuccessResponse } from '~types/api';

export interface MissionBriefInput {
  query: string;
  totalHits: number;
  selectedItem?: {
    title: string;
    description: string | null;
    dateCreated: string;
  };
}

export const postMissionBrief = async (input: MissionBriefInput): Promise<AiMissionBriefDto> => {
  const { data } = await apiClient.post<ApiSuccessResponse<AiMissionBriefDto>>(
    '/api/v1/ai/mission-brief',
    input
  );
  return data.data;
};
