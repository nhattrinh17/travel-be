import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepositoryInterface } from './interface/blog.interface';
import { BlogCategoryService } from '../blog-category/blog-category.service';
import { messageResponse } from 'src/constants';
import { PaginationDto } from 'src/custom-decorator';
import { generateSlug } from 'src/utils';
import { Op } from 'sequelize';

@Injectable()
export class BlogService {
  constructor(
    @Inject('BlogRepositoryInterface')
    private readonly blogRepository: BlogRepositoryInterface,
    private readonly blogCategoryService: BlogCategoryService,
  ) {}

  async create(dto: CreateBlogDto) {
    if (!dto.name || !dto.blogCategoryId || !dto.description || !dto.content) throw new Error(messageResponse.system.missingData);
    const blogCategory = await this.blogCategoryService.findOne(dto.blogCategoryId);
    if (!blogCategory) {
      throw new Error(messageResponse.blog.blogCategoryNotFound);
    }
    const slug = generateSlug(dto.name);
    const checkDuplicate = await this.blogRepository.findOneByCondition({ slug });
    if (checkDuplicate) throw new Error(messageResponse.system.duplicateData);
    return this.blogRepository.create({ ...dto, slug });
  }

  findAllCMS(pagination: PaginationDto, blogCategoryId: number) {
    const filter = {};
    if (blogCategoryId) {
      filter['blogCategoryId'] = blogCategoryId;
    }
    return this.blogRepository.findAll(filter, {
      ...pagination,
      projection: ['id', 'name', 'description', 'image', 'content', 'slug', 'view'],
    });
  }

  findAll(pagination: PaginationDto, blogCategoryId: number, sort: string, typeSort: string) {
    const filter = {};
    if (blogCategoryId) {
      filter['blogCategoryId'] = blogCategoryId;
    }
    return this.blogRepository.findAll(filter, {
      ...pagination,
      projection: ['name', 'description', 'image', 'slug', 'view'],
      sort,
      typeSort,
    });
  }

  findOne(id: number) {
    return this.blogRepository.findOneById(id);
  }

  findOneBySlug(slug: string) {
    return this.blogRepository.findOneByCondition({ slug }, ['id', 'name', 'description', 'image', 'content', 'view']);
  }

  findDataSEOBySlug(slug: string) {
    return this.blogRepository.findOneByCondition({ slug }, ['name', 'description', 'image']);
  }

  async update(id: number, dto: UpdateBlogDto) {
    const blogById = await this.findOne(id);
    if (!blogById) throw new Error(messageResponse.system.idInvalid);
    const slug = generateSlug(dto.name);
    const checkDuplicate = await this.blogRepository.findOneByCondition({
      slug,
      id: {
        [Op.ne]: id,
      },
    });
    if (checkDuplicate) throw new Error(messageResponse.system.duplicateData);
    return this.blogRepository.findByIdAndUpdate(id, { ...dto, slug });
  }

  async upViewBlogById(id: number) {
    const blogById = await this.findOne(id);
    if (!blogById) throw new Error(messageResponse.system.idInvalid);
    return this.blogRepository.upViewBlogById(id);
  }

  remove(id: number) {
    return this.blogRepository.softDelete(id);
  }
}
