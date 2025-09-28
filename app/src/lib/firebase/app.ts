import { getApp, getApps, initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { firebaseConfig, isFirebaseConfigured } from '@/config/firebase';

let firebaseApp: FirebaseApp | null = null;

if (isFirebaseConfigured() && firebaseConfig) {
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
} else {
  console.warn('[firebase] Configuração ausente. Usando mocks locais.');
}

export { firebaseApp };
