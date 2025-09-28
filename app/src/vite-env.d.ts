/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_FB_API_KEY?: string;
  readonly VITE_FB_AUTH_DOMAIN?: string;
  readonly VITE_FB_PROJECT_ID?: string;
  readonly VITE_FB_STORAGE_BUCKET?: string;
  readonly VITE_FB_APP_ID?: string;
  readonly VITE_FB_MEASUREMENT_ID?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
