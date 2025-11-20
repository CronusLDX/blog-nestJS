/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'database/posts/post.schema';
import { Model } from 'mongoose';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PostEntity } from '../domain/entities/post.entity';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import {
  ModelAlreadyExistsException,
  ModelNotFoundException,
} from '../exceptions';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @Inject(PrismaService) private prisma: PrismaService,
  ) {}

  async save(
    data: PostEntity,
    userToken: string,
  ): Promise<PostEntity | undefined> {
    try {
      const userSession = await this.prisma.login.findUniqueOrThrow({
        where: {
          token: userToken,
        },
        select: {
          userId: true,
        },
      });
      const result = await this.postModel.create({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImageUrl: data.coverImageUrl,
        published: data.published,
        authorId: userSession.userId,
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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ModelNotFoundException(
            'create-post/user-session-not-found-or-invalid-token',
          );
        }
        if (error.code === 'P2002') {
          throw new ModelAlreadyExistsException(
            'create-post/post-already-exists',
          );
        }
      }
    }
  }
}
