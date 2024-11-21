import { Injectable } from '@nestjs/common';
import { UpdateUserDTO, UserDTO } from '../user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService
  ) {}

  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    if (userDTO.password) {
      userDTO.password = await this.passwordService.hashPassword(
        userDTO.password
      );
    }
    const new_User = await this.userRepository.save(userDTO);
    return plainToInstance(UserDTO, new_User, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(userId: string, data: UpdateUserDTO) {
    // if (data.password) {
    //   data.password = await this.passwordService.hashPassword(data.password);
    // }

    await this.userRepository.update(userId, data);

    return plainToInstance(
      UserDTO,
      await this.userRepository.findOne({ where: { id: userId } }),
      {
        excludeExtraneousValues: true,
      }
    );
  }

  // Hàm tìm một người dùng bằng tên người dùng (hoặc bất kỳ trường nào khác)
  async findOne(phone_number: string): Promise<UserDTO | undefined> {
    return await this.userRepository.findOne({
      where: { phone_number },
    });
  }
}
