import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
