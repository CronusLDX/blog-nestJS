/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'database/posts/post.schema';
import { Model } from 'mongoose';
import { PostEntity } from '../domain/entities/post.entity';

import {
  MissingRequiredField,
  ModelAlreadyExistsException,
  ModelNotFoundException,
} from '../exceptions';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async save(data: PostEntity): Promise<PostEntity> {
    try {
      const result = await this.postModel.create({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImageUrl: data.coverImageUrl,
        published: data.published,
        authorId: data.authorId,
        createdAt: data.createdAt,
        updateAt: data.updateAt,
      });
      return PostEntity.restore({
        id: result.id,
        title: result.title,
        slug: result.slug,
        excerpt: result.excerpt,
        content: result.content,
        coverImageUrl: result.coverImageUrl,
        published: result.published,
        authorId: result.authorId,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ModelAlreadyExistsException(
          'create-post/post-already-exists',
        );
      }

      if (error.name === 'ValidationError') {
        throw new MissingRequiredField('create-post/missing-required-field');
      }
      throw error;
    }
  }

  async listAll(): Promise<PostEntity[]> {
    const result = await this.postModel.find().exec();
    return result.map((post) => {
      return PostEntity.restore({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published: post.published,
        authorId: post.authorId,
      });
    });
  }

  async get(id: string): Promise<PostEntity> {
    try {
      const result = await this.postModel.findOne({ id }).exec();

      if (!result) {
        throw new ModelNotFoundException('get-post/post-not-found');
      }
      return PostEntity.restore({
        id: result.id,
        title: result.title,
        slug: result.slug,
        excerpt: result.excerpt,
        content: result.content,
        coverImageUrl: result.coverImageUrl,
        published: result.published,
        authorId: result.authorId,
      });
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw new ModelNotFoundException('get-post/post-not-found');
      }
      throw error;
    }
  }

  async update(data: PostEntity): Promise<PostEntity> {
    try {
      const result = await this.postModel
        .findOneAndUpdate(
          { id: data.id },
          {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            coverImageUrl: data.coverImageUrl,
            published: data.published,
            authorId: data.authorId,
          },
        )
        .exec();

      if (!result) {
        throw new ModelNotFoundException('update-post/post-not-found');
      }
      return PostEntity.restore({
        id: result.id,
        title: result.title,
        slug: result.slug,
        excerpt: result.excerpt,
        content: result.content,
        coverImageUrl: result.coverImageUrl,
        published: result.published,
        authorId: result.authorId,
      });
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw error;
      }
      if (error === 'CastError') {
        throw new ModelNotFoundException('update-post/post-not-found');
      }
      if (error.name === 'ValidationError') {
        throw new MissingRequiredField('create-post/missing-required-field');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.postModel.deleteOne({ id }).exec();
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw new ModelNotFoundException('get-post/post-not-found');
      }
      throw error;
    }
  }

  async listAllUserPosts(userId: string): Promise<PostEntity[]> {
    const result = await this.postModel.find({ authorId: userId }).exec();
    return result.map((post) => {
      return PostEntity.restore({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImageUrl: post.coverImageUrl,
        published: post.published,
        authorId: post.authorId,
      });
    });
  }
}
