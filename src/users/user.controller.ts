import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './service/user.service';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import { request } from 'http';

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

  @Get('detail')
  @UseGuards(AuthGuard)
  getUserDetail(@Request() request) {
    const user = request.user;
    return {
      message: 'Chi tiết người dùng',
      status_code: 200,
      data: plainToInstance(UserDTO, user),
    };
  }

  @Post()
  async createUser(@Body() userDTO: UserDTO): Promise<UserDTO> {
    const user = await this.userService.createUser(userDTO);
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() userDTO: UpdateUserDTO) {
    const userPlain = plainToInstance(UpdateUserDTO, userDTO, {
      excludeExtraneousValues: true,
    });
    const user = await this.userService.updateUser(id, userPlain);
    return {
      message: 'Cập nhật thành công',
      status_code: 200,
      data: plainToInstance(UserDTO, user, { excludeExtraneousValues: true }),
    };
  }
}
