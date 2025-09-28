import Card from '@/components/ui/Card';
import type { Partner } from '@/types';

interface PartnerGridProps {
  partners: Partner[] | undefined;
}

const PartnerGrid = ({ partners }: PartnerGridProps) => (
  <div className="grid gap-4 md:grid-cols-3">
    {partners?.map((partner) => (
      <a
        key={partner.id}
        href={partner.siteUrl}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        <Card className="flex h-full items-center justify-center bg-slate-900 text-white">
          <span className="text-lg font-semibold">{partner.name}</span>
        </Card>
      </a>
    ))}
  </div>
);

export default PartnerGrid;
