import { BaseRepositoryInterface } from 'src/base';
import { BlogModel } from 'src/models';

export interface BlogRepositoryInterface extends BaseRepositoryInterface<BlogModel> {
  upViewBlogById(id: number): Promise<any>;
}
