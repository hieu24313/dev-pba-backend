/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ModuleRef } from '@nestjs/core';

@Controller('users')
export class UserController {
  constructor(private moduleRef: ModuleRef) {}

  @Get()
  getAllUsers() {
    return [
      { id: 1, name: 'Hiếu' },
      { id: 2, name: 'Lam' },
    ];
  }

  @Post('add')
  createUser(@Body() user: UserDTO): UserDTO {
    const userService = this.moduleRef.get(UserService);
    const userReal = userService.createUser(user);

    console.log(user);
    console.log(userReal);
    return userReal;
  }

  @Get(':id')
  getDetailUser() {
    return {
      id: 1,
      username: 'hieu24313',
      password: '123',
      full_name: 'Nguyễn Minh Hiếu',
    };
  }
}
