import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LoginRepository } from './repositories/login.repository';
import { LoginService } from './services/login.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [
    PrismaService,
    LoginRepository,
    LoginService,
    UserRepository,
    JwtService,
  ],
  exports: [LoginRepository, LoginService],
})
export class LoginModule {}
