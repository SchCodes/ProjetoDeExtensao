import { getStorage } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import { firebaseApp } from './app';

export const storage: FirebaseStorage | null = firebaseApp ? getStorage(firebaseApp) : null;

export const hasStorage = (): boolean => Boolean(storage);
