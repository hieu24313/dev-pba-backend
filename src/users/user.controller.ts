import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './service/user.service';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser() {
    const users = await this.userService.getUsers();
    const data_user = plainToInstance(UpdateUserDTO, users, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'Danh sách người dùng.',
      status_code: 200,
      data: data_user,
    };
  }

  @Get('detail')
  async getUserDetail(@Request() request) {
    const user = await this.userService.findOne(request.user.phone_number);
    // const user = request.user;
    return {
      message: 'Chi tiết người dùng',
      status_code: 200,
      data: plainToInstance(UpdateUserDTO, user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Post()
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar')) // Xử lý trường "avatar" trong FormData
  async createUser(
    @UploadedFile() file: Express.Multer.File, // File upload
    @Body() userDTO: UserDTO // Dữ liệu khác
  ): Promise<any> {
    const user = await this.userService.createUser(userDTO);
    // user_dto = this.userService.
    if (user == null) {
      return {
        message: 'Phone number is duplicate!',
        data: null,
        status: 400,
      };
    }
    // Xử lý logic lưu user hoặc file
    // const user_dto = plainToInstance(UserDTO, user, {
    //   excludeExtraneousValues: true,
    // });
    return {
      message: 'User created successfully!',
      status: 200,
      data: user,
    };
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

  @Post('check/exists')
  async checkExistsPhonenumber(@Body() data: string) {
    const user_exists = await this.userService.findOne(data['phone_number']);

    if (user_exists) {
      return {
        data: {},
        message: 'Người dùng tồn tại',
        status: 204,
      };
    }
    return {
      data: {},
      message: 'Người dùng chưa tồn tại',
      status: 200,
    };
  }
}
