import PageHeader from '@/components/common/PageHeader';
import StoriesList from '@/features/stories/components/StoriesList';
import { usePosts } from '@/features/stories/hooks/usePosts';

const StoriesPage = () => {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Histórias e resultados"
        description="Registro de resgates, tratamentos e finais felizes que só acontecem com seu apoio."
      />
      <StoriesList posts={posts} isLoading={isLoading} />
    </div>
  );
};

export default StoriesPage;
