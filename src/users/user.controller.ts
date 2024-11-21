import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './service/user.service';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUser() {
    return {
      message: 'Danh sách người dùng',
      status_code: 200,
      data: [],
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() userDTO: UserDTO): Promise<UserDTO> {
    console.log(
      plainToInstance(UserDTO, userDTO, { excludeExtraneousValues: true })
    );

    const user = await this.userService.createUser(userDTO);
    return user;
  }
}
