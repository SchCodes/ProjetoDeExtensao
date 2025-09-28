import EmptyState from '@/components/common/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import type { Dog } from '@/types';
import DogCard from './DogCard';

interface AdoptionListProps {
  dogs: Dog[] | undefined;
  isLoading: boolean;
}

const AdoptionList = ({ dogs, isLoading }: AdoptionListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-72 w-full" />
        ))}
      </div>
    );
  }

  if (!dogs?.length) {
    return (
      <EmptyState
        title="Nenhum cão disponível no momento"
        description="Volte em breve ou considere ser lar temporário."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default AdoptionList;
