import { Module } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryController } from './blog-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogCategoryModel } from 'src/models';
import { BlogCategoryRepository } from './repository/blog-category.repository';

@Module({
  imports: [SequelizeModule.forFeature([BlogCategoryModel])],
  controllers: [BlogCategoryController],
  providers: [
    BlogCategoryService,
    {
      provide: 'BlogCategoryRepositoryInterface',
      useClass: BlogCategoryRepository,
    },
  ],
  exports: [
    {
      provide: 'BlogCategoryRepositoryInterface',
      useClass: BlogCategoryRepository,
    },
    BlogCategoryService,
  ],
})
export class BlogCategoryModule {}
