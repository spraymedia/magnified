import { blogConfig } from './blog-config';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content_html?: string | null;
  featured_image_path?: string | null;
  featured_image_alt?: string | null;
  og_image_path?: string | null;
  og_image_alt?: string | null;
  category?: string | null;
  tags?: string[] | null;
  meta_title?: string | null;
  meta_description?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  gallery_images?: any | null;
  gallery_enabled?: boolean;
  author?: { id?: string | null; full_name?: string | null } | null;
}

type BlogListResponse = {
  data?: BlogPost[];
};

type BlogDetailResponse = {
  data?: BlogPost;
};

const getApiUrl = (path: string) => `${blogConfig.apiBaseUrl}/${blogConfig.orgSlug}${path}`;

export function formatBlogDate(date?: string | null) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export async function getAllPosts(limit = 100): Promise<BlogPost[]> {
  try {
    const response = await fetch(getApiUrl(`/posts?limit=${limit}`));
    if (!response.ok) return [];
    const json = (await response.json()) as BlogListResponse;
    const posts = Array.isArray(json.data) ? json.data : [];
    return posts.sort((a, b) => {
      const aDate = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bDate = b.published_at ? new Date(b.published_at).getTime() : 0;
      return bDate - aDate;
    });
  } catch {
    return [];
  }
}

export async function getLatestPosts(limit = 3) {
  const posts = await getAllPosts(limit);
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(getApiUrl(`/posts/${slug}`));
    if (response.status === 404 || !response.ok) return null;
    const json = (await response.json()) as BlogDetailResponse;
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(currentSlug: string, limit = 3) {
  const posts = await getAllPosts(20);
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
