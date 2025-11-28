export interface IPostRepository<T> {
  listAll(): Promise<T[]>; // listagem total de todos os posts
  get(postId: string): Promise<T>; // get unico para update
  getAllPostByUserId(userId: string): Promise<T[]>; // feature view my posts
  save(post: T): Promise<T>; // criar post
  update(post: T): Promise<T>; // alterar post
  delete(postId: string): Promise<void>; // deletar post
}
