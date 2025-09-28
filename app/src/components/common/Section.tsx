import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
}

const Section = ({ id, title, description, className, children }: PropsWithChildren<SectionProps>) => (
  <section id={id} className={clsx('space-y-6', className)}>
    {title ? (
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-slate-600">{description}</p> : null}
      </div>
    ) : null}
    <div className="grid gap-6">{children}</div>
  </section>
);

export default Section;
