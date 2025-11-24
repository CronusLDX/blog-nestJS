import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import type { IPostRepository } from '../repositories';
import { PostEntity } from '../domain/entities/post.entity';
import { CreatePostParams } from '../dto/internal';
import { LoginRepository } from 'src/core/login/repositories/login.repository';
import type { ILoginRepository } from 'src/core/login/repositories';
@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepository)
    private postRepository: IPostRepository<PostEntity>,
    @Inject(LoginRepository) private loginRepository: ILoginRepository<string>,
  ) {}

  async create(post: CreatePostParams, userToken: string): Promise<PostEntity> {
    const userId = await this.loginRepository.UserAuthentication(userToken);

    const data = PostEntity.create({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      published: post.published ?? false,
      authorId: userId,
      postedAt: post.postedAt,
    });

    return await this.postRepository.save(data);
  }

  async listAll(): Promise<PostEntity[]> {
    return await this.postRepository.listAll();
  }
}
