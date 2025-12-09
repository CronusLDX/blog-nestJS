export interface IPostRepository<T> {
  listAll(): Promise<T[]>; // listagem total de todos os posts
  get(postId: string): Promise<T>; // get unico para update
  save(post: T): Promise<T>; // criar post
  update(post: T): Promise<T>; // alterar post
  delete(postId: string): Promise<void>; // deletar post
  listAllUserPosts(userId: string): Promise<T[]>;
}
