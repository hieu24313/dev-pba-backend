import { Expose, plainToInstance } from 'class-transformer';

export abstract class BaseDTO {
  @Expose()
  id: number;

  @Expose() // Trả về cho client
  created_at: Date;

  @Expose()
  updated_at: Date;

  // Tự tạo obj từ json loại bỏ những field thừa trong json body
  static plainToInstance<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToInstance(this, obj, { excludeExtraneousValues: true });
  }
}
