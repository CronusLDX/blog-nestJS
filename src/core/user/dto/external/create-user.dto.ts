import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { CreateUserParams } from '../internal';

export class CreateUserDTO implements CreateUserParams {
  @IsString({ message: 'create-user/firstName-must-be-string' })
  @IsNotEmpty({ message: 'create-user/firstName-required' })
  @MinLength(2, { message: 'create-user/firstName-too-short' })
  firstName: string;

  @IsString({ message: 'create-user/lastname-must-be-string' })
  @IsNotEmpty({ message: 'create-user/lastname-required' })
  @MinLength(2, { message: 'create-user/lastname-too-short' })
  lastName: string;

  @IsString({ message: 'create-user/firstName-must-be-string' })
  @IsNotEmpty({ message: 'create-user/firstName-required' })
  @MinLength(2, { message: 'create-user/firstName-too-short' })
  @IsEmail({}, { message: 'create-user/email-invalid' })
  email: string;

  @IsString({ message: 'create-user/password-must-be-string' })
  @IsNotEmpty({ message: 'create-user/password-required' })
  @MinLength(8, { message: 'create-user/password-too-short' })
  password: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'create-user/profilePictureUrl-invalid-url' })
  profilePictureUrl?: string;
}
