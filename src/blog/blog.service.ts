import { Inject, Injectable } from '@nestjs/common';
import { BlogTemp } from './blog.module';

@Injectable()
export class BlogService {
  constructor(@Inject('BLOG_TEMP') blog: BlogTemp) {
    console.log(blog);
  }
  save(data: any): any {
    console.log(data);
  }
}
