import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../users/service/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const data = await this.authService.loginService(
      body['phone_number'],
      body['password']
    );
    if (data) {
      return {
        message: 'Đăng nhập thành công',
        status_code: 200,
        data: data,
      };
    }

    return {
      message: 'Sai tài khoản hoặc mật khẩu',
      status_code: 400,
      data: {},
    };
  }
}
