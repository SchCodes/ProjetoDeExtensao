import { useParams } from 'react-router-dom';
import EmptyState from '@/components/common/EmptyState';
import PageHeader from '@/components/common/PageHeader';
import Skeleton from '@/components/ui/Skeleton';
import AdoptionLeadForm from '@/features/adoption/components/AdoptionLeadForm';
import { useDog } from '@/features/adoption/hooks/useDogs';

const DogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dog, isLoading } = useDog(id ?? '');

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!dog) {
    return <EmptyState title="Cão não encontrado" description="Volte para a lista de adoção." />;
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <PageHeader title={dog.name} description={dog.description} />
        <div className="grid gap-4 md:grid-cols-2">
          {dog.photos.length ? (
            dog.photos.map((photo) => (
              <img
                key={photo}
                src={photo}
                alt={dog.name}
                className="h-60 w-full rounded-xl object-cover"
                loading="lazy"
              />
            ))
          ) : (
            <img
              src="https://placehold.co/600x400?text=ONG+C%C3%A3es"
              alt="Placeholder"
              className="h-60 w-full rounded-xl object-cover"
            />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Características</h2>
          <ul className="mt-2 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
            <li>Porte: {dog.size}</li>
            <li>Status: {dog.status}</li>
            <li>Idade: {dog.age} anos</li>
            <li>Tags: {dog.tags.join(', ')}</li>
          </ul>
        </div>
      </div>
      <AdoptionLeadForm dogId={dog.id} dogName={dog.name} />
    </div>
  );
};

export default DogDetailsPage;
