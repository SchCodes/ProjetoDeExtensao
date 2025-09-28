import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  asChild?: boolean;
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary-dark',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 focus-visible:outline-primary',
  outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-slate-400'
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={clsx(baseStyles, variants[variant], className)} {...props} />;
});

Button.displayName = 'Button';

export default Button;
