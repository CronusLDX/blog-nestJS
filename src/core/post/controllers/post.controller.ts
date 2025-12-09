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
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDTO } from '../dto/external/create-post.dto';
import {
  ForbbidenException,
  InternalServerError,
  MissingRequiredField,
  ModelAlreadyExistsException,
  ModelNotFoundException,
} from '../../login/exceptions';
import { UpdatePostDTO } from '../dto/external/update-post.dto';
import { JwtAuthGuard } from 'src/core/auth/guard/jwt-guard.guard';
import { CurrentUser } from 'src/core/auth/decorator/current-user.decorator';

@Controller('posts')
export class PostController {
  constructor(@Inject(PostService) private postService: PostService) {}

  @Post('')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() post: CreatePostDTO, @CurrentUser() userId: string) {
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
        userId,
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
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Body() post: UpdatePostDTO,
    @Param('postId') postId: string,
    @CurrentUser() userId: string,
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
        userId,
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

  @Get('user/all')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAllUserPosts(@CurrentUser() userId: string) {
    const result = await this.postService.listAllUserPosts(userId);
    return result.map((post) => post.export());
  }

  @Get('')
  @HttpCode(200)
  async getPosts() {
    try {
      const result = await this.postService.listAll();
      return result.map((post) => post.export());
    } catch (error) {
      throw new InternalServerError(
        'create-post/internal-server-error\n' + error,
      );
    }
  }

  // leitura de um unico post ou rascunhos não publicados
  @Get(':postId')
  @HttpCode(200)
  async getPost(@Param('postId') postId: string) {
    try {
      const result = await this.postService.get(postId);
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

  @Delete(':postId')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('postId') postId: string,
    @CurrentUser() userId: string,
  ) {
    try {
      await this.postService.delete(postId, userId);
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
