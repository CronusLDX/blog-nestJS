import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class ExampleModule {}
