import { Link } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import type { Dog } from '@/types';

interface DogCardProps {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => (
  <Card className="flex flex-col gap-4">
    <div className="overflow-hidden rounded-xl bg-slate-100">
      <img
        src={dog.photos[0] ?? 'https://placehold.co/600x400?text=ONG+C%C3%A3es'}
        alt={dog.name}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">{dog.name}</h3>
        <Badge>{dog.size}</Badge>
      </div>
      <p className="text-sm text-slate-600">{dog.description}</p>
      <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
        {dog.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2 py-1">
            #{tag}
          </span>
        ))}
      </div>
      <Link
        to={`/adocao/${dog.id}`}
        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark"
      >
        Quero saber mais ?
      </Link>
    </div>
  </Card>
);

export default DogCard;
