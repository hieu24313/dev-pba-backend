import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT) ?? 5432,
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'Admin@123',
      database: process.env.DB_DATABASE ?? 'nestdb',
      entities: [UserEntity],
      synchronize: true, // Đảm bảo rằng schema được đồng bộ
      // logging: true, // Nếu cần bật logging
    }),
    ChatModule,
  ],
})
export class AppModule {}
