import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { firebaseApp } from './app';

export const firestore: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;

export const hasFirestore = (): boolean => Boolean(firestore);
