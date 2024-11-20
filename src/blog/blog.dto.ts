import { Expose } from 'class-transformer';
import { BaseDTO } from '../common/base.dto';

export class BlogDTO extends BaseDTO {
  @Expose()
  content: string;
}
