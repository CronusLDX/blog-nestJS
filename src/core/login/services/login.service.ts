import { Inject, Injectable } from '@nestjs/common';
import { LoginRepository } from '../repositories/login.repository';
import type { ILoginRepository } from '../repositories';
import { LoginEntity } from '../domain/entities/login.entity';
import { LoginParams } from '../dto/internal';
import { UserRepository } from 'src/core/user/repositories/user.repository';
import type { IUserRepository } from 'src/core/user/repositories';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  InvalidCredentialsException,
  UserNotFundException,
} from '../exceptions';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @Inject(LoginRepository)
    private loginRepository: ILoginRepository<LoginEntity>,
    @Inject(UserRepository)
    private userRepository: IUserRepository<UserEntity>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  accessToken(userId: string, email: string) {
    if (!userId) {
      throw new UserNotFundException('auth-user/user-not-found');
    }
    const payload = { sub: userId, email: email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30m',
    });
    return { accessToken };
  }
  async login(login: LoginParams) {
    const user = await this.userRepository.findUserByEmail(login.email);
    if (!user) {
      throw new UserNotFundException('auth-user/user-not-found');
    }
    const isPasswordValid = await bcrypt.compare(login.password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException('auth-user/invalid-credentials');
    }
    const rawToken = uuidv4();
    const hashedToken = await bcrypt.hash(rawToken, 10);
    const data = LoginEntity.create({
      hashedToken: hashedToken,
      userId: user.id ?? '',
      revoked: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 day
    });
    await this.loginRepository.create(data);
    const accessToken = this.accessToken(user.id ?? '', user.email);
    return { accessToken: accessToken, refreshToken: rawToken };
  }
}
