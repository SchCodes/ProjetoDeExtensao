import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Flags } from '@/types';
import { queryKeys } from '@/lib/queryKeys';
import { updateFeatureFlags } from '../api/flags';

export const useFeatureFlagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flags: Flags) => updateFeatureFlags(flags),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.flags });
    }
  });
};
