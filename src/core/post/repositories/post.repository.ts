/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'database/posts/post.schema';
import { Model, MongooseError } from 'mongoose';
import { PostEntity } from '../domain/entities/post.entity';

import { ModelAlreadyExistsException } from '../exceptions';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async save(data: PostEntity): Promise<PostEntity | undefined> {
    try {
      const result = await this.postModel.create({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImageUrl: data.coverImageUrl,
        published: data.published,
        authorId: data.authorId,
        postedAt: data.postedAt,
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
        postedAt: result.postedAt,
      });
    } catch (error) {
      if (error instanceof MongooseError) {
        if (error.cause === 11000) {
          throw new ModelAlreadyExistsException(
            'create-post/post-already-exists',
          );
        }
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
        postedAt: post.postedAt,
      });
    });
  }
}
