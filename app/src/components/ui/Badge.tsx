import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary',
      className
    )}
    {...props}
  />
);

export default Badge;
