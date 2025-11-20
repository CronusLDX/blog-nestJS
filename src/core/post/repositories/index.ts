export interface IPostRepository<T> {
  listAll(): Promise<T[]>;
  get(postId: string): Promise<T>;
  save(post: T): Promise<T>;
  update(postId: string, post: T): Promise<T>;
  delete(postId: string): Promise<void>;
}
