import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { BlogCategoryRepositoryInterface } from './interface/blog-category.interface';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';
import { generateSlug } from 'src/utils';
import { Op } from 'sequelize';

@Injectable()
export class BlogCategoryService {
  constructor(
    @Inject('BlogCategoryRepositoryInterface')
    private readonly blogCategoryRepository: BlogCategoryRepositoryInterface,
  ) {}
  async create(dto: CreateBlogCategoryDto) {
    if (!dto.name) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(dto.name);
    const checkDuplicate = await this.blogCategoryRepository.findOneByCondition({ slug });
    if (checkDuplicate) throw new Error(messageResponse.system.duplicateData);
    return this.blogCategoryRepository.create(dto);
  }

  findAll(pagination: PaginationDto) {
    const filter = {};
    return this.blogCategoryRepository.findAll(filter, { ...pagination });
  }

  findOne(id: number) {
    return this.blogCategoryRepository.findOneById(id);
  }

  async update(id: number, dto: UpdateBlogCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(dto.name);
    const checkDuplicate = await this.blogCategoryRepository.findOneByCondition({ slug, id: { [Op.ne]: id } });
    if (checkDuplicate) throw new Error(messageResponse.system.duplicateData);
    return this.blogCategoryRepository.findByIdAndUpdate(id, dto);
  }

  remove(id: number) {
    return this.blogCategoryRepository.softDelete(id);
  }
}
