import { Inject, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class LoginRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async UserAuthentication(userToken: string) {
    try {
      const userSession = await this.prisma.login.findUniqueOrThrow({
        where: {
          token: userToken,
        },
        select: {
          userId: true,
        },
      });
      return userSession.userId;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('user-login/user-session-invalid-or-not-found');
        }
      }
    }
  }
}
