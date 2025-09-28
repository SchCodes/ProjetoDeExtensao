import PageHeader from '@/components/common/PageHeader';
import VolunteerForm from '@/features/volunteer/components/VolunteerForm';

const VolunteerPage = () => (
  <div className="space-y-8">
    <PageHeader
      title="Faça parte como voluntário(a)"
      description="Preencha o formulário indicando seu interesse: lar temporário, transporte, eventos, redes sociais, doações e mais."
    />
    <VolunteerForm />
  </div>
);

export default VolunteerPage;
