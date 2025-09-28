import { useMutation } from '@tanstack/react-query';
import type { LeadAdoption } from '@/types';
import { createAdoptionLead } from '../api';

export const useCreateAdoptionLead = () =>
  useMutation({
    mutationFn: (payload: Omit<LeadAdoption, 'id' | 'createdAt'>) => createAdoptionLead(payload)
  });
