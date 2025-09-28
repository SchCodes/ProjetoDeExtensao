import { useQuery } from '@tanstack/react-query';
import type { Partner } from '@/types';
import { queryKeys } from '@/lib/queryKeys';
import { fetchPartners } from '../api';

export const usePartners = () =>
  useQuery<Partner[]>({
    queryKey: queryKeys.partners,
    queryFn: fetchPartners
  });
