import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT) ?? 3306,
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'Admin@123',
      database: process.env.DB_DATABASE ?? 'nestdb',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
