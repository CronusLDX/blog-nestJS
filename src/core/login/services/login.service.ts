import { Inject, Injectable } from '@nestjs/common';
import { LoginRepository } from '../repositories/login.repository';
import type { ILoginRepository } from '../repositories';

@Injectable()
export class LoginService {
  constructor(
    @Inject(LoginRepository) private loginRepository: ILoginRepository<string>,
  ) {}
  async UserAuthentication(userToken: string) {
    return await this.loginRepository.UserAuthentication(userToken);
  }
}
