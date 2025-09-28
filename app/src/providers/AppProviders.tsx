import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import AppToaster from '@/components/ui/AppToaster';
import { AdminProvider } from './AdminProvider';
import { FeatureFlagProvider } from './FeatureFlagProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false
    }
  }
});

const AppProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <FeatureFlagProvider>
        <AdminProvider>
          {children}
          <AppToaster />
        </AdminProvider>
      </FeatureFlagProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
