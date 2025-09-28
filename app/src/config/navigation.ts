import type { Flags } from '@/types';

type NavItem = {
  label: string;
  path: string;
  requiresFlag?: keyof Flags;
};

export const publicNavigation: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Adoção', path: '/adocao', requiresFlag: 'adoption' },
  { label: 'Doações', path: '/doacoes', requiresFlag: 'donations' },
  { label: 'Histórias', path: '/historias', requiresFlag: 'stories' },
  { label: 'Parceiros', path: '/parceiros', requiresFlag: 'partners' },
  { label: 'Voluntário', path: '/voluntario', requiresFlag: 'volunteers' }
];

export const adminNavigation: NavItem[] = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Feature Flags', path: '/admin/flags' },
  { label: 'Cães', path: '/admin/caes' },
  { label: 'Posts', path: '/admin/posts' },
  { label: 'Parceiros', path: '/admin/parceiros' },
  { label: 'Leads', path: '/admin/leads' },
  { label: 'Resultados', path: '/admin/resultados' }
];
