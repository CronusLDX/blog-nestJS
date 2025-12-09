import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserEntity } from '../domain/entities/user.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserNotFundException } from 'src/core/login/exceptions';

@Injectable()
export class UserRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
      return UserEntity.restore(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserNotFundException('auth-user/user-not-found');
        }
      }
    }
  }
}
