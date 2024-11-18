import { UserDTO } from './user.dto';
import { UserRepository } from './user.repository';

export class UserService {
  userRepository: UserRepository;

  constructor(userRepo: UserRepository) {}
  createUser(user: any): any {
    return UserDTO.plainToInstance(user);
  }
}
