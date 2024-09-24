import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { ApiOperationCustom, Pagination, PaginationDto } from 'src/custom-decorator';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';

@ApiTags('Blog Categories')
@Controller('blog-category')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}

  @Post()
  @ApiOperationCustom('Blog Categories', 'post')
  create(@Body() createBlogCategoryDto: CreateBlogCategoryDto) {
    return this.blogCategoryService.create(createBlogCategoryDto);
  }

  @Get()
  @Public()
  @ApiOperationCustom('Blog Categories', 'get')
  findAll(@Pagination() pagination: PaginationDto) {
    return this.blogCategoryService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperationCustom('Blog Categories', 'get', true, true)
  findOne(@Param('id') id: string) {
    return this.blogCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Blog Categories', 'patch')
  update(@Param('id') id: string, @Body() updateBlogCategoryDto: UpdateBlogCategoryDto) {
    return this.blogCategoryService.update(+id, updateBlogCategoryDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Blog Categories', 'delete')
  remove(@Param('id') id: string) {
    return this.blogCategoryService.remove(+id);
  }
}
