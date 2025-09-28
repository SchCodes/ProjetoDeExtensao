import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './providers/AppProviders';
import AppRoutes from './router/AppRoutes';
import './styles/global.css';
import { registerServiceWorker } from '@/lib/pwa/registerServiceWorker';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
);

\nregisterServiceWorker();\n
