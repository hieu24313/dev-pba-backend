import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StoreService } from './store.service';
import { UserDTO } from './user.dto';
import { BlogModule } from '../blog/blog.module';

function createStore(baseUser: UserDTO): StoreService {
  console.log('baseUser', baseUser);
  return new StoreService();
}

@Module({
  imports: [
    BlogModule.register({
      content: 'truyền dynamic test',
      username: 'admin',
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserService', // key inject
      useClass: UserService, // value nhận được khi inject
    },
    {
      provide: 'BaseUser',
      useValue: { id: 1, username: 'admin', password: 'admin' } as UserDTO,
    },
    {
      provide: 'STORE_SERVICE',
      useFactory: createStore,
      inject: [
        //Truyền những biến đã đc khai báo và lấy ở nơi khác
        {
          token: 'BaseUser',
          optional: true,
        },
      ],
    },
  ],
})
export class UserModule {}
