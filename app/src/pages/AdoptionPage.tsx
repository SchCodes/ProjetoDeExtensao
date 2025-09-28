import PageHeader from '@/components/common/PageHeader';
import AdoptionList from '@/features/adoption/components/AdoptionList';
import { useDogs } from '@/features/adoption/hooks/useDogs';

const AdoptionPage = () => {
  const { data: dogs, isLoading } = useDogs('disponível');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Adoção responsável"
        description="Preencha o formulário após escolher um cão para que possamos iniciar o processo de adoção."
      />
      <AdoptionList dogs={dogs} isLoading={isLoading} />
    </div>
  );
};

export default AdoptionPage;
