import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

export default Input;
