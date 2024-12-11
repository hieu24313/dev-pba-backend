import { Injectable } from '@nestjs/common';
import { UserService } from '../users/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../users/service/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService
  ) {}

  async loginService(phone_number: string, password: string) {
    const user = await this.userService.findOne((phone_number = phone_number));
    // xử lý kiểm tra password

    if (user == null) {
      return null;
    }
    const isComparePassword = await this.passwordService.comparePassword(
      password,
      user.password
    );

    if (!isComparePassword) {
      return null;
    }
    const payload = {
      id: user.id,
      phone_number: user.phone_number,
      username: user.username,
      full_name: user.full_name,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      phone_number: user.phone_number,
      token: access_token,
    };
  }
}
