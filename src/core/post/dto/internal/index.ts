export interface CreatePostParams {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  published?: boolean;
  authorId: string;
}

export interface UpdatePostParams {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  published?: boolean;
  authorId?: string;
}
