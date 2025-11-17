import { IsOptional } from 'class-validator';
import { UpdatePostParams } from '../internal';

export class UpdatePostDTO implements Omit<UpdatePostParams, 'id'> {
  @IsOptional()
  title?: string;

  @IsOptional()
  slug?: string;

  @IsOptional()
  excerpt?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  coverImageUrl?: string;

  @IsOptional()
  published?: boolean;

  @IsOptional()
  authorId?: string;
}
