import type { Flags } from '@/types';

type NavItem = {
  label: string;
  path: string;
  requiresFlag?: keyof Flags;
};

export const publicNavigation: NavItem[] = [
  { label: 'In�cio', path: '/' },
  { label: 'Ado��o', path: '/adocao', requiresFlag: 'adoption' },
  { label: 'Doa��es', path: '/doacoes', requiresFlag: 'donations' },
  { label: 'Hist�rias', path: '/historias', requiresFlag: 'stories' },
  { label: 'Parceiros', path: '/parceiros', requiresFlag: 'partners' },
  { label: 'Volunt�rio', path: '/voluntario', requiresFlag: 'volunteers' }
];

export const adminNavigation: NavItem[] = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Feature Flags', path: '/admin/flags' },
  { label: 'C�es', path: '/admin/caes' },
  { label: 'Posts', path: '/admin/posts' },
  { label: 'Parceiros', path: '/admin/parceiros' },
  { label: 'Leads', path: '/admin/leads' },
  { label: 'Resultados', path: '/admin/resultados' }
];
