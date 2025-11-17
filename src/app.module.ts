import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from './services/prisma/prisma.module';

const connection = process.env.DATABASE_URL_MONGODB;
@Module({
  imports: [MongooseModule.forRoot(connection ? connection : ''), PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
