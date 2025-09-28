import { useMutation } from '@tanstack/react-query';
import type { LeadVolunteer } from '@/types';
import { createVolunteerLead } from '@/features/adoption/api';

export const useCreateVolunteerLead = () =>
  useMutation({
    mutationFn: (payload: Omit<LeadVolunteer, 'id' | 'createdAt'>) => createVolunteerLead(payload)
  });
