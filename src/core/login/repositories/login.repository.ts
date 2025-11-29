import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class LoginRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
}
