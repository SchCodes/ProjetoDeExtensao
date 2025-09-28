import type { HTMLAttributes, PropsWithChildren } from 'react';
import { clsx } from 'clsx';

const Card = ({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div className={clsx('rounded-xl border border-slate-200 bg-white p-6 shadow-card', className)} {...props}>
    {children}
  </div>
);

export default Card;
