import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/common/PageHeader';
import { usePartners } from '@/features/partners/hooks/usePartners';

const AdminPartnersPage = () => {
  const { data: partners } = usePartners();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Parceiros"
        description="Cadastre parceiros ativos e destaque quem apoia a ONG."
        actions={<Button type="button">Novo parceiro</Button>}
      />
      <Card className="space-y-3">
        {partners?.map((partner) => (
          <div key={partner.id} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-semibold text-slate-900">{partner.name}</p>
              <p className="text-xs text-slate-500">{partner.siteUrl}</p>
            </div>
            <span className="text-xs font-semibold uppercase text-primary">{partner.active ? 'ativo' : 'inativo'}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AdminPartnersPage;
