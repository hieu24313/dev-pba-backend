/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsEmpty, IsNotEmpty, Length } from 'class-validator';
import { BaseDTO } from '../common/base.dto';
import { UserGender } from './user.entity';

export class UserDTO extends BaseDTO {
  @Expose()
  id: string;

  @Expose()
  full_name: string;

  // @Length(5, 50)
  @Expose() // Trả về cho client
  username: string;

  @Expose()
  phone_number: string;

  @IsNotEmpty()
  @Length(8)
  password: string;

  @Expose()
  gender: UserGender;

  @Expose()
  skill_rating: number;

  @Expose()
  avatar: string;

  @Expose()
  email: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}

export class UpdateUserDTO extends BaseDTO {
  @Expose()
  id: string;

  @Expose()
  full_name: string;

  // @Length(5, 50)
  @Expose() // Trả về cho client
  username: string;

  @Expose()
  phone_number: string;

  @Expose()
  gender: UserGender;

  @Expose()
  skill_rating: number;

  @Expose()
  avatar: string;

  @Expose()
  email: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
