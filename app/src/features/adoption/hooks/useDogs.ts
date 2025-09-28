import { useQuery } from '@tanstack/react-query';
import type { Dog, DogStatus } from '@/types';
import { queryKeys } from '@/lib/queryKeys';
import { fetchDogById, fetchDogs } from '../api';

export const useDogs = (status: DogStatus = 'disponível') =>
  useQuery<Dog[]>({
    queryKey: [...queryKeys.dogs, status],
    queryFn: () => fetchDogs(status)
  });

export const useDog = (id: string) =>
  useQuery<Dog | null>({
    queryKey: queryKeys.dog(id),
    queryFn: () => fetchDogById(id),
    enabled: Boolean(id)
  });
