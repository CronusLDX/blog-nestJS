import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import type { IPostRepository } from '../repositories';
import { PostEntity } from '../domain/entities/post.entity';
import { CreatePostParams, UpdatePostParams } from '../dto/internal';

import { LoginService } from 'src/core/login/services/login.service';
import { ForbbidenException } from '../exceptions';
@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepository)
    private postRepository: IPostRepository<PostEntity>,
    @Inject(LoginService) private loginService: LoginService,
  ) {}

  async create(post: CreatePostParams, userToken: string): Promise<PostEntity> {
    const userId = await this.loginService.UserAuthentication(userToken);
    if (!userId) {
      throw new ForbbidenException('create-post/user-not-authorized');
    }
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

  async get(id: string, userToken: string): Promise<PostEntity> {
    const userId = await this.loginService.UserAuthentication(userToken);
    if (!userId) {
      throw new ForbbidenException('create-post/user-not-authorized');
    }
    return await this.postRepository.get(id);
  }

  async update(data: UpdatePostParams, userToken: string): Promise<PostEntity> {
    const userId = await this.loginService.UserAuthentication(userToken);
    if (!userId) {
      throw new ForbbidenException('update-post/user-not-authorized');
    }
    const post = await this.postRepository.get(data.id ?? '');
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

  async delete(id: string, userToken: string): Promise<void> {
    const userId = await this.loginService.UserAuthentication(userToken);
    if (!userId) {
      throw new ForbbidenException('create-post/user-not-authorized');
    }
    return await this.postRepository.delete(id);
  }
}
