import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
@Global()
export class PrismaModule {}

// modulo de prisma para ser usado em toda a aplicacao
