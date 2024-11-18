import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  createUser(user: any): any {
    return UserDTO.plainToInstance(user);
  }
}
