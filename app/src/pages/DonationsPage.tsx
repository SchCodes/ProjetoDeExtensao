import PageHeader from '@/components/common/PageHeader';
import DonationsSection from '@/features/donations/components/DonationsSection';

const DonationsPage = () => (
  <div className="space-y-8">
    <PageHeader
      title="Doa��es que mant�m a ONG viva"
      description="PIX, itens priorit�rios e como empresas podem apoiar a causa."
    />
    <DonationsSection />
  </div>
);

export default DonationsPage;
