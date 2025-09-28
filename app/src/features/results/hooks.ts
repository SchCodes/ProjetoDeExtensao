import { useQuery } from '@tanstack/react-query';
import type { Result } from '@/types';
import { queryKeys } from '@/lib/queryKeys';
import { fetchResults } from './api';

export const useResults = () =>
  useQuery<Result[]>({
    queryKey: queryKeys.results,
    queryFn: fetchResults
  });
