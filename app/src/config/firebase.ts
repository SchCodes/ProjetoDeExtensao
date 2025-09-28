import type { FirebaseOptions } from 'firebase/app';

const requiredKeys = [
  'VITE_FB_API_KEY',
  'VITE_FB_AUTH_DOMAIN',
  'VITE_FB_PROJECT_ID',
  'VITE_FB_STORAGE_BUCKET',
  'VITE_FB_APP_ID'
] as const;

type RequiredKey = (typeof requiredKeys)[number];

type Env = Record<RequiredKey | 'VITE_FB_MEASUREMENT_ID', string | undefined>;

const env: Env = {
  VITE_FB_API_KEY: import.meta.env.VITE_FB_API_KEY,
  VITE_FB_AUTH_DOMAIN: import.meta.env.VITE_FB_AUTH_DOMAIN,
  VITE_FB_PROJECT_ID: import.meta.env.VITE_FB_PROJECT_ID,
  VITE_FB_STORAGE_BUCKET: import.meta.env.VITE_FB_STORAGE_BUCKET,
  VITE_FB_APP_ID: import.meta.env.VITE_FB_APP_ID,
  VITE_FB_MEASUREMENT_ID: import.meta.env.VITE_FB_MEASUREMENT_ID
};

export const isFirebaseConfigured = (): boolean =>
  requiredKeys.every((key) => Boolean(env[key] && env[key] !== ''));

export const firebaseConfig: FirebaseOptions | null = isFirebaseConfigured()
  ? {
      apiKey: env.VITE_FB_API_KEY!,
      authDomain: env.VITE_FB_AUTH_DOMAIN!,
      projectId: env.VITE_FB_PROJECT_ID!,
      storageBucket: env.VITE_FB_STORAGE_BUCKET!,
      appId: env.VITE_FB_APP_ID!,
      measurementId: env.VITE_FB_MEASUREMENT_ID
    }
  : null;
