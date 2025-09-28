import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('animate-pulse rounded-lg bg-slate-200', className)} {...props} />
);

export default Skeleton;
