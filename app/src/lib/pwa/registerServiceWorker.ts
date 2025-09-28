export const registerServiceWorker = () => {
  if (import.meta.env.DEV) {
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.info('Nova versão disponível. Atualize para carregar as novidades.');
                }
              });
            }
          });
        })
        .catch((error) => console.error('Erro ao registrar service worker', error));
    });
  }
};
