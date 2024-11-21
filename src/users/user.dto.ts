/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsEmpty, IsNotEmpty, Length } from 'class-validator';
import { BaseDTO } from '../common/base.dto';

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  // @Length(5, 50)
  @Expose() // Trả về cho client
  username: string;

  @Expose()
  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  // @Expose()
  password: string;

  @IsNotEmpty()
  @Expose()
  full_name: string;

  // Custom field
  @Transform(({ obj }) => 'Xin chào, ' + obj.full_name)
  @Expose()
  name?: string;
}
