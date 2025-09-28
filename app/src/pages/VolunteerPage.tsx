import PageHeader from '@/components/common/PageHeader';
import VolunteerForm from '@/features/volunteer/components/VolunteerForm';

const VolunteerPage = () => (
  <div className="space-y-8">
    <PageHeader
      title="Fa�a parte como volunt�rio(a)"
      description="Preencha o formul�rio indicando seu interesse: lar tempor�rio, transporte, eventos, redes sociais, doa��es e mais."
    />
    <VolunteerForm />
  </div>
);

export default VolunteerPage;
