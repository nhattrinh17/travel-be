import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { BlogCategoryModel } from 'src/models';
import { BlogCategoryRepositoryInterface } from '../interface/blog-category.interface';
@Injectable()
export class BlogCategoryRepository extends BaseRepositoryAbstract<BlogCategoryModel> implements BlogCategoryRepositoryInterface {
  constructor(@InjectModel(BlogCategoryModel) private readonly blogCategoryModel: typeof BlogCategoryModel) {
    super(BlogCategoryModel);
  }
}
