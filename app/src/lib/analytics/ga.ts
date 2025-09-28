export const logAnalyticsEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
