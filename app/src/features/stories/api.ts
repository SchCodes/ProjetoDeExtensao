import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { mockPosts } from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { Post } from '@/types';

export const fetchPosts = async (): Promise<Post[]> => {
  if (!hasFirestore() || !firestore) {
    return mockPosts;
  }

  const q = query(collection(firestore, 'posts'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Post));
};
