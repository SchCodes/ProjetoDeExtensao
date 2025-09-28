import Card from '@/components/ui/Card';
import type { Post } from '@/types';
import { formatDate } from '@/lib/format';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => (
  <Card className="flex flex-col gap-4">
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
        {post.type === 'story' ? 'História' : post.type === 'care' ? 'Cuidados' : 'Resgate'}
      </span>
      <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
      <p className="text-sm text-slate-600">{post.summary}</p>
    </div>
    <div className="mt-auto space-y-2 text-xs text-slate-500">
      <span>{formatDate(post.date)}</span>
      {post.photos?.length ? (
        <img
          src={post.photos[0] ?? ''}
          alt=""
          className="h-40 w-full rounded-xl object-cover"
          loading="lazy"
        />
      ) : null}
    </div>
  </Card>
);

export default PostCard;
