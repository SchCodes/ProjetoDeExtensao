import type { PropsWithChildren, ReactNode } from 'react';
import { clsx } from 'clsx';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({ title, description, actions, className, children }: PropsWithChildren<PageHeaderProps>) => (
  <header className={clsx('flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-card md:flex-row md:items-center md:justify-between', className)}>
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.2em] text-secondary">ONG Cães</p>
      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      {description ? <p className="text-base text-slate-600">{description}</p> : null}
      {children}
    </div>
    {actions ? <div className="flex flex-col items-stretch gap-3 md:items-end">{actions}</div> : null}
  </header>
);

export default PageHeader;
