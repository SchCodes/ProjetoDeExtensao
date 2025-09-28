import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { mockAdoptionLeads, mockVolunteerLeads } from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { LeadAdoption, LeadVolunteer } from '@/types';

export const fetchAdoptionLeads = async (): Promise<LeadAdoption[]> => {
  if (!hasFirestore() || !firestore) {
    return mockAdoptionLeads;
  }

  const snapshot = await getDocs(query(collection(firestore, 'leads_adoption'), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as LeadAdoption));
};

export const fetchVolunteerLeads = async (): Promise<LeadVolunteer[]> => {
  if (!hasFirestore() || !firestore) {
    return mockVolunteerLeads;
  }

  const snapshot = await getDocs(
    query(collection(firestore, 'leads_volunteer'), orderBy('createdAt', 'desc'))
  );
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as LeadVolunteer));
};
