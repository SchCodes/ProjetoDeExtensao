import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { mockResults } from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { Result } from '@/types';

export const fetchResults = async (): Promise<Result[]> => {
  if (!hasFirestore() || !firestore) {
    return mockResults;
  }

  const q = query(collection(firestore, 'results'), orderBy('id', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Result));
};
