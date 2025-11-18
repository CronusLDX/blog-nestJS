import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LoginRepository } from './repositories/login.repository';
import { LoginService } from './services/login.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, LoginRepository, LoginService],
})
export class UserModule {}
