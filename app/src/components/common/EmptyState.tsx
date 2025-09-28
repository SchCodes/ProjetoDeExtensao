import type { HTMLAttributes, PropsWithChildren } from 'react';
import { clsx } from 'clsx';

const EmptyState = ({ title, description, className, children }: PropsWithChildren<{ title: string; description?: string; className?: string; }>) => (
  <div className={clsx('flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600', className)}>
    <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
    {description ? <p className="text-sm text-slate-500">{description}</p> : null}
    {children}
  </div>
);

export default EmptyState;
