import EmptyState from '@/components/common/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import type { Post } from '@/types';
import PostCard from './PostCard';

interface StoriesListProps {
  posts: Post[] | undefined;
  isLoading: boolean;
}

const StoriesList = ({ posts, isLoading }: StoriesListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <EmptyState title="Nenhuma história publicada" description="Volte em breve para novidades. :)" />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default StoriesList;
