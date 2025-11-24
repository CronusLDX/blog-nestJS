export interface ILoginRepository<T> {
  listAll(): Promise<T[]>;
  get(postId: string): Promise<T>;
  create(post: T): Promise<T>;
  update(postId: string, post: T): Promise<T>;
  delete(postId: string): Promise<void>;
  UserAuthentication(userToken: string): Promise<string>;
}
