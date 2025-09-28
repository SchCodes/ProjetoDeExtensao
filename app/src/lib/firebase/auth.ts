import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Auth
} from 'firebase/auth';
import { firebaseApp } from './app';

export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;

export const observeAuthState = (callback: Parameters<typeof onAuthStateChanged>[1]) => {
  if (!auth) {
    console.warn('[auth] Firebase não configurado, retornando unsubscribe noop.');
    return () => undefined;
  }

  return onAuthStateChanged(auth, callback);
};

export const signInAdmin = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase Auth não configurado.');
  }

  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const signOutAdmin = async () => {
  if (!auth) {
    return;
  }
  await signOut(auth);
};
