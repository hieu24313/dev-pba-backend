import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../common/base.entity';

export enum UserGender {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  full_name: string;

  @Column({
    default: null,
  })
  username: string;

  @Column({
    default: null,
  })
  phone_number: string;

  @Column({
    default: null,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.OTHER,
  })
  gender: UserGender;

  @Column({
    default: 0,
  })
  skill_rating: number;

  @Column({
    default: null,
  })
  avatar: string;

  @Column({
    default: null,
  })
  email: string;
}
