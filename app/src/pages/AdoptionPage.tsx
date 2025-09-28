import PageHeader from '@/components/common/PageHeader';
import AdoptionList from '@/features/adoption/components/AdoptionList';
import { useDogs } from '@/features/adoption/hooks/useDogs';

const AdoptionPage = () => {
  const { data: dogs, isLoading } = useDogs('dispon�vel');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ado��o respons�vel"
        description="Preencha o formul�rio ap�s escolher um c�o para que possamos iniciar o processo de ado��o."
      />
      <AdoptionList dogs={dogs} isLoading={isLoading} />
    </div>
  );
};

export default AdoptionPage;
