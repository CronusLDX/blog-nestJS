import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ILoginRepository } from './index';
import { LoginEntity } from '../domain/entities/login.entity';

@Injectable()
export class LoginRepository implements ILoginRepository<LoginEntity> {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  // create a register in Login table
  async create(login: LoginEntity): Promise<LoginEntity> {
    const rawData = LoginEntity.restore({
      id: login.id,
      hashedToken: login.hashedToken,
      userId: login.userId,
      revoked: login.revoked,
      expiresAt: login.expiresAt,
      createdAt: login.createdAt,
    });
    await this.prisma.login.create({
      data: {
        id: rawData.id,
        hashedToken: rawData.hashedToken,
        userId: rawData.userId,
        revoked: rawData.revoked,
        expiresAt: rawData.expiresAt,
        createdAt: rawData.createdAt,
      },
    });
    return rawData;
  }
}
