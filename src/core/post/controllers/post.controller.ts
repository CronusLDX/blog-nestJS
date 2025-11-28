import {
  Controller,
  HttpCode,
  Inject,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDTO } from '../dto/external/create-post.dto';
import {
  ForbbidenException,
  InternalServerError,
  MissingRequiredField,
  ModelAlreadyExistsException,
  ModelNotFoundException,
} from '../exceptions';
import { UpdatePostDTO } from '../dto/external/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(@Inject(PostService) private postService: PostService) {}

  @Post('')
  @HttpCode(201)
  async createPost(
    @Body() post: CreatePostDTO,
    @Headers('authorization') userToken: string,
  ) {
    try {
      const result = await this.postService.create(
        {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImageUrl: post.coverImageUrl,
          published: post.published,
        },
        userToken,
      );
      return result.export();
    } catch (error) {
      if (error instanceof ModelAlreadyExistsException) {
        throw new ModelAlreadyExistsException(
          'create-post/post-already-exists',
        );
      }
      if (error instanceof MissingRequiredField) {
        throw new MissingRequiredField('create-post/missing-required-field');
      }
      if (error instanceof ForbbidenException) {
        throw new ForbbidenException('create-post/user-not-authorized');
      }
      throw new InternalServerError(
        'create-post/internal-server-error\n' + error,
      );
    }
  }

  @Put(':postId')
  @HttpCode(200)
  async updatePost(
    @Body() post: UpdatePostDTO,
    @Param('postId') postId: string,
    @Headers('authorization') userToken: string,
  ) {
    try {
      const result = await this.postService.update(
        {
          id: postId,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImageUrl: post.coverImageUrl,
          published: post.published,
        },
        userToken,
      );
      return result.export();
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw new ModelNotFoundException('update-post/post-not-found');
      }
      if (error instanceof MissingRequiredField) {
        throw new MissingRequiredField('create-post/missing-required-field');
      }
      if (error instanceof ForbbidenException) {
        throw new ForbbidenException('create-post/user-not-authorized');
      }
      throw new InternalServerError(
        'create-post/internal-server-error\n' + error,
      );
    }
  }

  @Get(':postId')
  @HttpCode(200)
  async getPost(
    @Param('postId') postId: string,
    @Headers('authorization') userToken: string,
  ) {
    try {
      const result = await this.postService.get(postId, userToken);
      return result.export();
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw new ModelNotFoundException('get-post/post-not-found');
      }
      if (error instanceof ForbbidenException) {
        throw new ForbbidenException('create-post/user-not-authorized');
      }
      throw new InternalServerError(
        'create-post/internal-server-error\n' + error,
      );
    }
  }
  @Get('')
  @HttpCode(200)
  async getPosts() {
    try {
      const result = await this.postService.listAll();
      return result.map((post) => post.export());
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw new ModelNotFoundException('get-post/post-not-found');
      }
      if (error instanceof ForbbidenException) {
        throw new ForbbidenException('create-post/user-not-authorized');
      }
      throw new InternalServerError(
        'create-post/internal-server-error\n' + error,
      );
    }
  }

  @Delete(':postId')
  @HttpCode(204)
  async deletePost(
    @Param('postId') postId: string,
    @Headers('authorization') userToken: string,
  ) {
    try {
      await this.postService.delete(postId, userToken);
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw new ModelNotFoundException('delete-post/post-not-found');
      }
      if (error instanceof ForbbidenException) {
        throw new ForbbidenException('create-post/user-not-authorized');
      }
      throw new InternalServerError(
        'create-post/internal-server-error\n' + error,
      );
    }
  }
}
