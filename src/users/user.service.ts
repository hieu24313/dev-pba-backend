import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserRepository } from './user.repository';
import { StoreService } from './store.service';
import { BlogService } from '../blog/blog.service';

@Injectable()
export class UserService {
  // Cách lấy provider trong userValue
  constructor(
    @Inject('BaseUser') BaseUser: any,
    @Inject('STORE_SERVICE') private storeService: StoreService,
    // @Inject('blogService') private blogService: BlogService
    private blogSer: BlogService
  ) {
    this.blogSer.save('test123');
    // console.log(BaseUser);
  }
  createUser(user: any): any {
    this.storeService.save(user);
    return UserDTO.plainToInstance(user);
  }
}
