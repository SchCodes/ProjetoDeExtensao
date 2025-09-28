import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { defaultFlags } from '@/config/featureFlags';
import { queryKeys } from '@/lib/queryKeys';
import type { Flags } from '@/types';
import { fetchFeatureFlags } from '@/features/admin/api/flags';

type FeatureFlagContextValue = {
  flags: Flags;
  isLoading: boolean;
  refetch: () => void;
};

const FeatureFlagContext = createContext<FeatureFlagContextValue>({
  flags: defaultFlags,
  isLoading: false,
  refetch: () => undefined
});

export const FeatureFlagProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.flags,
    queryFn: fetchFeatureFlags,
    initialData: defaultFlags,
    staleTime: 1000 * 60 * 5
  });

  return (
    <FeatureFlagContext.Provider value={{ flags: data ?? defaultFlags, isLoading, refetch }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlagContextValue => useContext(FeatureFlagContext);
