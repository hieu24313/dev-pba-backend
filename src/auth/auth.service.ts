import { Injectable } from '@nestjs/common';
import { UserService } from '../users/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async loginService(phone_number: string, password: string) {
    const user = await this.userService.findOne((phone_number = phone_number));
    console.log(user);
    // xử lý kiểm tra password

    const payload = { sub: user.id, phone_number: user.phone_number };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      phone_number: user.phone_number,
      token: access_token,
    };
  }
}
