import { useQuery } from '@tanstack/react-query';
import type { LeadAdoption, LeadVolunteer } from '@/types';
import { queryKeys } from '@/lib/queryKeys';
import { fetchAdoptionLeads, fetchVolunteerLeads } from '../api/leads';

export const useAdoptionLeads = () =>
  useQuery<LeadAdoption[]>({
    queryKey: queryKeys.leadsAdoption,
    queryFn: fetchAdoptionLeads
  });

export const useVolunteerLeads = () =>
  useQuery<LeadVolunteer[]>({
    queryKey: queryKeys.leadsVolunteer,
    queryFn: fetchVolunteerLeads
  });
