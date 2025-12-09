import { UserEntity } from '../domain/entities/user.entity';

export interface IUserRepository<T> {
  listAll(): Promise<T[]>;
  get(postId: string): Promise<T>;
  create(post: T): Promise<T>;
  update(postId: string, post: T): Promise<T>;
  delete(postId: string): Promise<void>;
  findUserByEmail(email: string): Promise<UserEntity | undefined>;
}
