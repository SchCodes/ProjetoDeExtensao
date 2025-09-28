import PageHeader from '@/components/common/PageHeader';
import PartnerGrid from '@/features/partners/components/PartnerGrid';
import { usePartners } from '@/features/partners/hooks/usePartners';

const PartnersPage = () => {
  const { data: partners } = usePartners();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Parceiros do bem"
        description="Empresas e profissionais que caminham conosco oferecendo serviços, doações e divulgação."
      />
      <PartnerGrid partners={partners} />
    </div>
  );
};

export default PartnersPage;
