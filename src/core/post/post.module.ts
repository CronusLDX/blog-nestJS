import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../../../database/posts/post.schema';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [
    PrismaModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PrismaService, PostService, PostRepository],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
