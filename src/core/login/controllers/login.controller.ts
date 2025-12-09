import {
  Body,
  Controller,
  HttpCode,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginParamsDTO } from '../dto/external/login-params.dto';
import {
  InvalidCredentialsException,
  UserNotFundException,
} from '../exceptions';

@Controller('login')
export class LoginController {
  constructor(@Inject(LoginService) private loginService: LoginService) {}

  @Post('')
  @HttpCode(201)
  async login(@Body() loginDTO: LoginParamsDTO) {
    try {
      const data = await this.loginService.login(loginDTO);
      return data;
    } catch (error) {
      if (error instanceof UserNotFundException) {
        throw new UserNotFundException('auth-user/user-not-found');
      } else if (error instanceof InvalidCredentialsException) {
        throw new InvalidCredentialsException('auth-user/invalid-credentials');
      }
      throw new InternalServerErrorException(
        'auth-user/internal-server-error' + error,
      );
    }
  }

  // função de atualização de refreshToken se o refreshToken  estiver expirado
  // função de re-login com refreshtoken que não esteja expirado e gerar um novo JWT, se expirado trocar o revoked para true e retornar erro
  // logout
  // buscar um login especifico
}
