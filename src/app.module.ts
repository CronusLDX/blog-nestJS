import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from './services/prisma/prisma.module';
import { LoginModule } from './core/login/login.module';
import { UserModule } from './core/user/user.module';
import { PostModule } from './core/post/post.module';
import { AuthModule } from './core/auth/auth.module';

const connection = process.env.DATABASE_URL_MONGODB;
@Module({
  imports: [
    MongooseModule.forRoot(connection ? connection : ''),
    PrismaModule,
    LoginModule,
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
