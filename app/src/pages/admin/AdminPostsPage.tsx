import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/common/PageHeader';
import { usePosts } from '@/features/stories/hooks/usePosts';

const AdminPostsPage = () => {
  const { data: posts } = usePosts();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Histórias e resultados"
        description="Publique relatos, campanhas e resultados mensais."
        actions={<Button type="button">Novo post</Button>}
      />
      <Card className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
              <span className="text-xs uppercase tracking-widest text-secondary">{post.type}</span>
            </div>
            <p className="text-sm text-slate-600">{post.summary}</p>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AdminPostsPage;
