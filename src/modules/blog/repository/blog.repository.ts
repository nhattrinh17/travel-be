import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/base';
import { BlogModel } from 'src/models';
import { BlogRepositoryInterface } from '../interface/blog.interface';
@Injectable()
export class BlogRepository extends BaseRepositoryAbstract<BlogModel> implements BlogRepositoryInterface {
  constructor(@InjectModel(BlogModel) private readonly blogModel: typeof BlogModel) {
    super(BlogModel);
  }
  upViewBlogById(id: number): Promise<any> {
    return this.blogModel.increment('view', {
      where: { id: id },
    });
  }
}
