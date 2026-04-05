import { useMutation } from '@tanstack/react-query';
import { postMissionBrief } from '../api/aiApi';

export const useAiMissionBrief = () => {
  return useMutation({ mutationFn: postMissionBrief });
};
