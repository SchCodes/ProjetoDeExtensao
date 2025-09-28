import { doc, getDoc, setDoc } from 'firebase/firestore';
import { mockFlags } from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { Flags } from '@/types';

const DOC_ID = 'public';

export const fetchFeatureFlags = async (): Promise<Flags> => {
  if (!hasFirestore() || !firestore) {
    return mockFlags;
  }

  const snapshot = await getDoc(doc(firestore, 'flags', DOC_ID));
  if (!snapshot.exists()) {
    return mockFlags;
  }

  return { ...mockFlags, ...snapshot.data() } as Flags;
};

export const updateFeatureFlags = async (flags: Flags): Promise<void> => {
  if (!hasFirestore() || !firestore) {
    console.warn('[flags] Firebase não configurado. Alterações não foram persistidas.');
    return;
  }

  await setDoc(doc(firestore, 'flags', DOC_ID), flags, { merge: true });
};
