import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types';
import { queryKeys } from '@/lib/queryKeys';
import { fetchPosts } from '../api';

export const usePosts = () =>
  useQuery<Post[]>({
    queryKey: queryKeys.posts,
    queryFn: fetchPosts
  });
