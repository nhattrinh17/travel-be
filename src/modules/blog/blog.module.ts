import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogCategoryModule } from '../blog-category/blog-category.module';
import { BlogRepository } from './repository/blog.repository';
import { BlogCategoryService } from '../blog-category/blog-category.service';
import { BlogModel } from 'src/models';

@Module({
  imports: [
    //
    SequelizeModule.forFeature([BlogModel]),
    BlogCategoryModule,
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    BlogCategoryService,
    {
      provide: 'BlogRepositoryInterface',
      useClass: BlogRepository,
    },
  ],
})
export class BlogModule {}
