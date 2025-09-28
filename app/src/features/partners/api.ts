import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { mockPartners } from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { Partner } from '@/types';

export const fetchPartners = async (): Promise<Partner[]> => {
  if (!hasFirestore() || !firestore) {
    return mockPartners;
  }

  const q = query(collection(firestore, 'partners'), where('active', '==', true), orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Partner));
};
