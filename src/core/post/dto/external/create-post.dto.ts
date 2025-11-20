import { CreatePostParams } from '../internal';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsUrl,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreatePostDTO
  implements Omit<CreatePostParams, 'authorId' | 'postedAt'>
{
  @IsString({ message: 'create-post/title-must-be-string' })
  @IsNotEmpty({ message: 'create-post/title-required' })
  @MinLength(2, { message: 'create-post/title-too-short' })
  title: string;

  @IsString({ message: 'create-post/slug-must-be-string' })
  @IsNotEmpty({ message: 'create-post/slug-required' })
  @MinLength(2, { message: 'create-post/title-too-short' })
  slug: string;

  @IsString({ message: 'create-post/excerpt-must-be-string' })
  @IsNotEmpty({ message: 'create-post/excerpt-required' })
  @MinLength(2, { message: 'create-post/excerpt-too-short' })
  excerpt: string;

  @IsString({ message: 'create-post/content-must-be-string' })
  @IsNotEmpty({ message: 'create-post/content-required' })
  @MinLength(2, { message: 'create-post/content-too-short' })
  content: string;

  @IsUrl(
    { protocols: ['http', 'https'] },
    { message: 'create-post/coverImageUrl-must-be-url' },
  )
  @IsOptional()
  coverImageUrl?: string;

  @IsBoolean({ message: 'create-post/published-must-be-boolean' })
  published: boolean;

  // @IsString({ message: 'create-post/authorId-must-be-string' })
  // @IsUUID('4', { message: 'create-post/authorId-must-be-uuid' })
  // @IsNotEmpty({ message: 'create-post/authorId-required' })
  // authorId: string;
}
