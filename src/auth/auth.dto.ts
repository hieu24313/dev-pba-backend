import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @Expose()
  username: string;

  @Expose()
  @IsNotEmpty()
  phone_number: string;

  @Expose()
  token: string;
}
