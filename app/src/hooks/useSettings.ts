import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { fetchSettings } from '@/features/settings/api';
import type { Settings } from '@/types';

export const useSettings = () =>
  useQuery<Settings>({
    queryKey: queryKeys.settings,
    queryFn: fetchSettings
  });
