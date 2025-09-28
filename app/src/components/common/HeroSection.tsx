import type { ReactNode } from 'react';
import Button from '@/components/ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  illustration?: ReactNode;
}

const HeroSection = ({ title, subtitle, cta, secondaryCta, illustration }: HeroSectionProps) => (
  <section className="grid gap-8 rounded-3xl bg-white px-8 py-12 shadow-card md:grid-cols-[1.2fr_1fr] md:items-center">
    <div className="space-y-6">
      <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
        Somos uma ONG de proteção a cães
      </span>
      <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">{title}</h1>
      <p className="text-lg text-slate-600">{subtitle}</p>
      <div className="flex flex-wrap items-center gap-4">
        {cta ? (
          <Button asChild>
            <a href={cta.href}>{cta.label}</a>
          </Button>
        ) : null}
        {secondaryCta ? (
          <Button variant="outline" asChild>
            <a href={secondaryCta.href}>{secondaryCta.label}</a>
          </Button>
        ) : null}
      </div>
    </div>
    {illustration ? <div className="relative isolate">{illustration}</div> : null}
  </section>
);

export default HeroSection;
