import { DynamicModule, Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

export interface BlogTemp {
  content: string;
  username: string;
}
@Module({
  providers: [
    BlogService,
    {
      provide: 'blogService',
      useClass: BlogService,
    },
    {
      provide: 'BLOG_TEMP',
      useValue: {
        content: 'content',
        username: 'admin',
      } as BlogTemp,
    },
  ],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {
  static register(blog: BlogTemp): DynamicModule {
    return {
      module: BlogModule,
      providers: [
        BlogService,
        {
          provide: 'blogService',
          useClass: BlogService,
        },
        {
          provide: 'BLOG_TEMP',
          useValue: blog,
        },
      ],
      exports: [BlogService],
    };
  }
}
