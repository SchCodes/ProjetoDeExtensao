import { doc, getDoc } from 'firebase/firestore';
import { mockSettings } from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { Settings } from '@/types';

export const fetchSettings = async (): Promise<Settings> => {
  if (!hasFirestore() || !firestore) {
    return mockSettings;
  }

  const snapshot = await getDoc(doc(firestore, 'settings', 'public'));
  if (!snapshot.exists()) {
    return mockSettings;
  }

  const data = snapshot.data() as Settings;
  return {
    ...mockSettings,
    ...data
  };
};
