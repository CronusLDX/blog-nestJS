import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import type { IPostRepository } from '../repositories';
import { PostEntity } from '../domain/entities/post.entity';
import { CreatePostParams, UpdatePostParams } from '../dto/internal';
import { ForbbidenException } from '../../login/exceptions';
@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepository)
    private postRepository: IPostRepository<PostEntity>,
  ) {}

  async create(post: CreatePostParams, userId: string): Promise<PostEntity> {
    const data = PostEntity.create({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      published: post.published ?? false,
      authorId: userId,
    });

    return await this.postRepository.save(data);
  }

  async listAll(): Promise<PostEntity[]> {
    return await this.postRepository.listAll();
  }

  async get(id: string): Promise<PostEntity> {
    return await this.postRepository.get(id);
  }

  async update(data: UpdatePostParams, userId: string): Promise<PostEntity> {
    const post = await this.postRepository.get(data.id ?? '');

    if (data.authorId !== userId) {
      throw new ForbbidenException('update-post/user-not-authorized');
    }

    post.changeTitle(data.title ?? post.title);
    post.changeSlug(data.slug ?? post.slug);
    post.changeExcerpt(data.excerpt ?? post.excerpt);
    post.changeContent(data.content ?? post.content);
    post.changeCoverImageUrl(
      data.coverImageUrl
        ? data.coverImageUrl
        : post.coverImageUrl
          ? post.coverImageUrl
          : '',
    );
    post.changePublished(data.published ?? post.published);

    return await this.postRepository.update(post);
  }

  async delete(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.get(id);
    if (post.authorId !== userId) {
      throw new ForbbidenException('delete-post/user-not-authorized');
    }
    return await this.postRepository.delete(id);
  }

  async listAllUserPosts(userId: string): Promise<PostEntity[]> {
    return await this.postRepository.listAllUserPosts(userId);
  }
}
