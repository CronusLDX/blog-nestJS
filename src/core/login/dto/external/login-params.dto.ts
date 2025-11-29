import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { LoginParams } from '../internal';

export class LoginParamsDTO implements LoginParams {
  @IsEmail({}, { message: 'login-params/email-invalid' })
  @IsNotEmpty({ message: 'login-params/email-required' })
  @IsString({ message: 'login-params/email-must-be-string' })
  email: string;

  @Matches(
    // 1 letra maiúscula, 1 número , 1 caractere especial e no mínimo 8 caracteres
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    {
      message: 'login-params/password-invalid',
    },
  )
  @IsNotEmpty({ message: 'login-params/password-required' })
  @MinLength(8, { message: 'login-params/password-too-short' })
  @IsString({ message: 'login-params/password-must-be-string' })
  password: string;
}
