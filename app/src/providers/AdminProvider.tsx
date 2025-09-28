import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

const STORAGE_KEY = 'ong-caes:isAdmin';

type AdminContextValue = {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
};

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  setAdmin: () => undefined
});

export const AdminProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setIsAdmin(stored === 'true');
  }, []);

  const setAdmin = (next: boolean) => {
    setIsAdmin(next);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  };

  return <AdminContext.Provider value={{ isAdmin, setAdmin }}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): AdminContextValue => useContext(AdminContext);
