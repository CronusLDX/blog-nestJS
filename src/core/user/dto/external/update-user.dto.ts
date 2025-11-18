import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { UpdateUserParams } from '../internal';

export class UpdateUserDTO implements Omit<UpdateUserParams, 'id'> {
  @IsString({ message: 'create-user/firstName-must-be-string' })
  @IsOptional()
  firstName: string;

  @IsString({ message: 'create-user/lastname-must-be-string' })
  @IsOptional()
  lastName: string;

  @IsString({ message: 'create-user/firstName-must-be-string' })
  @IsEmail({}, { message: 'create-user/email-invalid' })
  @IsOptional()
  email: string;

  @IsString({ message: 'create-user/password-must-be-string' })
  @IsOptional()
  password: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'create-user/profilePictureUrl-invalid-url' })
  profilePictureUrl?: string;
}
